#!/usr/bin/env node
/**
 * Fetch venue details from SerpAPI Google Local for all SXSW venues.
 * Groups venue variants (Indoor/Outdoor/Patio/Rooftop) under same physical location.
 * Outputs data/venues.json
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const SEARCH_SCRIPT = path.join(ROOT, '.claude/skills/serpapi-search/scripts/search.sh');
const OUTPUT = path.join(ROOT, 'data/venues.json');

// Load all unique venue names from schedule JSONs
function loadVenueNames() {
  const distDir = path.join(ROOT, 'dist/schedule');
  const files = fs.readdirSync(distDir).filter(f => f.match(/2026-03-\d+\.json/));
  const all = new Set();
  files.forEach(f => {
    const data = JSON.parse(fs.readFileSync(path.join(distDir, f), 'utf8'));
    (data.venues || []).forEach(v => all.add(v));
  });
  return [...all].sort();
}

// Group variants to a single physical venue for search
function groupVenues(names) {
  const suffixes = [' Indoor', ' Inside', ' Outdoor', ' Patio', ' Rooftop', ' In', ' Out', ' Backyard', ' Garden'];
  const groups = {}; // baseSearch -> { searchName, variants: [] }

  for (const name of names) {
    let base = name;
    for (const suffix of suffixes) {
      if (name.endsWith(suffix)) {
        base = name.slice(0, -suffix.length);
        break;
      }
    }

    // Special cases
    const specialMappings = {
      'Cheer Up Charlies': 'Cheer Up Charlie\'s',
      'Pearl St Co-op': 'Pearl St Co-Op',
      'Radio/East': 'Radio East',
      'Hotel Vegas Inside': 'Hotel Vegas',
      'Hotel Vegas Patio': 'Hotel Vegas',
      'Side Bar Inside': 'Side Bar',
      'Side Bar Patio': 'Side Bar',
      'Global Stage @ Downright Austin Backyard': 'Downright Austin',
      'Nivel @ Mala Fama': 'Mala Fama',
      'Coconut Club Rooftop': 'Coconut Club',
      'Neon Grotto Rooftop': 'Neon Grotto',
      'Mala Fama Rooftop': 'Mala Fama',
      'Swan Dive Patio': 'Swan Dive',
      'The Creek and the Cave Backyard': 'The Creek and the Cave',
      'High Noon In': 'High Noon',
      'High Noon Out': 'High Noon',
      'HowMuch?! Studios In': 'HowMuch Studios',
      'HowMuch?! Studios Out': 'HowMuch Studios',
      'Inn Cahoots Austin Garden': 'Inn Cahoots Austin',
      'Inn Cahoots Studio': 'Inn Cahoots Austin',
      'Hilton Grand Ballroom (Salon HJK)': 'Hilton Austin',
    };

    const searchBase = specialMappings[name] || base;

    if (!groups[searchBase]) {
      groups[searchBase] = { searchName: searchBase, variants: [] };
    }
    groups[searchBase].variants.push(name);
  }

  return groups;
}

// Search a single venue via SerpAPI google_local
function searchVenue(name) {
  const query = `${name} Austin TX`;
  try {
    const raw = execSync(
      `"${SEARCH_SCRIPT}" "${query}" --engine google_local --location "Austin, Texas, United States" --json`,
      { encoding: 'utf8', timeout: 15000 }
    );
    const data = JSON.parse(raw);
    const results = data.local_results || [];
    if (results.length > 0) {
      return results[0]; // best match
    }
  } catch (e) {
    console.error(`  Error searching "${name}": ${e.message}`);
  }
  return null;
}

// Build Google Maps link from name + address (shows venue name in Maps)
function mapsLink(name, result) {
  if (result.address) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ', ' + result.address + ', Austin, TX')}`;
  }
  if (name) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ', Austin, TX')}`;
  }
  return null;
}

async function main() {
  console.log('Loading venue names from schedule...');
  const allNames = loadVenueNames();
  console.log(`Found ${allNames.length} venue names`);

  const groups = groupVenues(allNames);
  const searchKeys = Object.keys(groups).sort();
  console.log(`Grouped into ${searchKeys.length} unique physical venues\n`);

  const venues = {};
  let found = 0;
  let notFound = 0;

  for (let i = 0; i < searchKeys.length; i++) {
    const key = searchKeys[i];
    const group = groups[key];
    console.log(`[${i + 1}/${searchKeys.length}] Searching: ${group.searchName}...`);

    const result = searchVenue(group.searchName);

    if (result) {
      found++;
      const venue = {
        name: group.searchName,
        variants: group.variants,
        address: result.address || null,
        lat: result.gps_coordinates?.latitude || null,
        lng: result.gps_coordinates?.longitude || null,
        google_maps_url: mapsLink(group.searchName, result),
        thumbnail: result.thumbnail || null,
        type: result.type || null,
        rating: result.rating || null,
        reviews: result.reviews || null,
        phone: result.phone || null,
        website: result.website || null,
      };
      venues[key] = venue;
      console.log(`  ✓ ${venue.address || 'no address'}`);
    } else {
      notFound++;
      venues[key] = {
        name: group.searchName,
        variants: group.variants,
        address: null,
        lat: null,
        lng: null,
        google_maps_url: null,
        thumbnail: null,
        type: null,
        rating: null,
        reviews: null,
        phone: null,
        website: null,
      };
      console.log(`  ✗ not found`);
    }

    // Small delay to avoid rate limiting
    if (i < searchKeys.length - 1) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  // Write output
  const output = {
    _meta: {
      generated: new Date().toISOString(),
      total_physical_venues: searchKeys.length,
      total_venue_names: allNames.length,
      found,
      not_found: notFound,
    },
    venues,
  };

  fs.writeFileSync(OUTPUT, JSON.stringify(output, null, 2));
  console.log(`\nDone! ${found} found, ${notFound} not found.`);
  console.log(`Output: ${OUTPUT}`);
}

main();
