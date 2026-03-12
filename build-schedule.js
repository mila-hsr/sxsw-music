#!/usr/bin/env node
/**
 * SXSW 2026 — Music Schedule Builder
 * Converts community CSV spreadsheets into schedule JSON + Markdown
 *
 * Usage: node build-schedule.js [csv-dir]
 * Default csv-dir: ./csv/
 */

const fs = require('fs');
const path = require('path');

const csvDir = process.argv[2] || path.join(__dirname, 'csv');
const distDir = path.join(__dirname, 'dist', 'schedule');

if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// ── Day config ──
const DAYS = [
  { key: 'thu12', date: '2026-03-12', day: 'Thursday', short: 'Thu Mar 12', file: 'SxSW 2026 - Thu 3_12.csv' },
  { key: 'fri13', date: '2026-03-13', day: 'Friday', short: 'Fri Mar 13', file: 'SxSW 2026 - Fri 3_13.csv' },
  { key: 'sat14', date: '2026-03-14', day: 'Saturday', short: 'Sat Mar 14', file: 'SxSW 2026 - Sat 3_14.csv' },
  { key: 'sun15', date: '2026-03-15', day: 'Sunday', short: 'Sun Mar 15', file: 'SxSW 2026 - Sun 3_15.csv' },
  { key: 'mon16', date: '2026-03-16', day: 'Monday', short: 'Mon Mar 16', file: 'SxSW 2026 - Mon 3_16.csv' },
  { key: 'tue17', date: '2026-03-17', day: 'Tuesday', short: 'Tue Mar 17', file: 'SxSW 2026 - Tues 3_17.csv' },
  { key: 'wed18', date: '2026-03-18', day: 'Wednesday', short: 'Wed Mar 18', file: 'SxSW 2026 - Weds 3_18.csv' },
];

// ── CSV Parser ──
function parseCSV(text) {
  const lines = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === '\n' && !inQuotes) { lines.push(current); current = ''; continue; }
    if (ch === '\r' && !inQuotes) continue;
    current += ch;
  }
  if (current) lines.push(current);
  return lines.map(line => {
    const cols = [];
    let cell = '';
    let q = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { q = !q; continue; }
      if (ch === ',' && !q) { cols.push(cell.trim()); cell = ''; continue; }
      cell += ch;
    }
    cols.push(cell.trim());
    return cols;
  });
}

// ── Time classification ──
function categorizeTime(label) {
  const m = label.toLowerCase().match(/(\d+)/);
  if (!m) return 'evening';
  const hour = parseInt(m[1]);
  const isPM = label.toLowerCase().includes('p');
  const isAM = label.toLowerCase().includes('a');
  if (isAM && hour === 12) return 'late_night';
  if (isAM && hour <= 2) return 'late_night';
  if (isAM) return 'daytime';
  if (isPM) {
    if (hour === 12 || (hour >= 1 && hour < 5)) return 'afternoon';
    if (hour >= 5 && hour < 9) return 'evening';
    return 'late_night';
  }
  return 'evening';
}

// ── Load artists.json for cross-referencing ──
function loadArtists() {
  const p = path.join(__dirname, 'dist', 'artists.json');
  if (!fs.existsSync(p)) return {};
  const data = JSON.parse(fs.readFileSync(p, 'utf8'));
  const map = {};
  data.artists.forEach(a => {
    map[a.name.toLowerCase()] = a;
  });
  return map;
}

// ── Process one day ──
function processDay(dayConfig, artistsMap) {
  const csvPath = path.join(csvDir, dayConfig.file);
  if (!fs.existsSync(csvPath)) {
    console.log(`  ⚠ CSV not found: ${dayConfig.file}`);
    return null;
  }

  const rows = parseCSV(fs.readFileSync(csvPath, 'utf8'));
  if (rows.length < 2) return null;

  const header = rows[0];
  const venues = header.slice(1);

  const schedule = [];
  const allActs = new Set();
  const allVenues = new Set();
  const blockCounts = { daytime: 0, afternoon: 0, evening: 0, late_night: 0 };

  for (let r = 1; r < rows.length; r++) {
    const row = rows[r];
    const timeLabel = row[0];
    if (!timeLabel) continue;

    const sets = [];
    for (let c = 1; c < row.length && c <= venues.length; c++) {
      const cell = row[c];
      if (!cell) continue;

      const venue = venues[c - 1];
      // Parse "Artist Name (time)" or just "Artist Name"
      const match = cell.match(/^(.+?)\s*\(([^)]+)\)$/);
      let name, actualTime;
      if (match) {
        name = match[1].trim();
        actualTime = match[2].trim();
      } else {
        name = cell.trim();
        actualTime = null;
      }

      if (!name) continue;

      const artistKey = name.toLowerCase();
      const featured = artistsMap[artistKey] || null;

      const set = {
        artist: name,
        venue: venue,
        start: actualTime || null,
      };

      if (featured) {
        set.featured = true;
        set.tier = featured.tier || featured.category;
        set.genre = featured.genre;
        if (featured.spotify_audio_features) {
          set.audio = {
            energy: featured.spotify_audio_features.avg_energy,
            danceability: featured.spotify_audio_features.avg_danceability,
            valence: featured.spotify_audio_features.avg_valence,
          };
        }
      }

      sets.push(set);
      allActs.add(name);
      allVenues.add(venue);
    }

    if (sets.length > 0) {
      const block = categorizeTime(timeLabel);
      blockCounts[block] += sets.length;
      schedule.push({
        time: timeLabel,
        block: block,
        sets: sets.sort((a, b) => a.venue.localeCompare(b.venue)),
      });
    }
  }

  return {
    date: dayConfig.date,
    day: dayConfig.day,
    short: dayConfig.short,
    total_acts: allActs.size,
    total_venues: allVenues.size,
    time_blocks: {
      daytime: { range: '9a – 11:30a', acts: blockCounts.daytime },
      afternoon: { range: '12p – 4:30p', acts: blockCounts.afternoon },
      evening: { range: '5p – 8:30p', acts: blockCounts.evening },
      late_night: { range: '9p – 1:30a', acts: blockCounts.late_night },
    },
    venues: [...allVenues].sort(),
    schedule: schedule,
    source: 'reddit-community-spreadsheet',
    pdf: `https://static.sxsw.md/files/sxsw2026-music-${dayConfig.key}.pdf`,
  };
}

// ── Generate Markdown for a day ──
function generateDayMarkdown(data) {
  let md = `---
title: "SXSW 2026 Music Schedule — ${data.day}, ${data.date}"
date: "${data.date}"
day: "${data.day}"
total_acts: ${data.total_acts}
total_venues: ${data.total_venues}
source: reddit-community-spreadsheet
format: agent-readable
---

# Music Schedule: ${data.day}, ${data.date.split('-').slice(1).join('/')}

> ${data.total_acts} acts across ${data.total_venues} venues. 9 AM to 1:30 AM.

## Time Blocks

| Block | Time | Acts |
|-------|------|------|
| Daytime | ${data.time_blocks.daytime.range} | ${data.time_blocks.daytime.acts} |
| Afternoon | ${data.time_blocks.afternoon.range} | ${data.time_blocks.afternoon.acts} |
| Evening | ${data.time_blocks.evening.range} | ${data.time_blocks.evening.acts} |
| Late Night | ${data.time_blocks.late_night.range} | ${data.time_blocks.late_night.acts} |

## Schedule

`;

  for (const slot of data.schedule) {
    md += `### ${slot.time}\n\n`;
    md += `| Artist | Venue | Start |\n|--------|-------|-------|\n`;
    for (const s of slot.sets) {
      const feat = s.featured ? ' ⭐' : '';
      md += `| ${s.artist}${feat} | ${s.venue} | ${s.start || slot.time} |\n`;
    }
    md += '\n';
  }

  md += `## Venues (${data.total_venues})\n\n`;
  md += data.venues.map(v => `- ${v}`).join('\n');
  md += `\n\n## Download\n\n- PDF: ${data.pdf}\n- JSON: \`/music/schedule/${data.date}?format=json\`\n`;
  md += `\n## API\n\n\`\`\`bash\ncurl -H "Accept: application/json" https://sxsw.md/music/schedule/${data.date}\ncurl -H "Accept: text/markdown" https://sxsw.md/music/schedule/${data.date}\n\`\`\`\n`;

  return md;
}

// ── Generate week overview Markdown ──
function generateWeekMarkdown(allDays) {
  let md = `---
title: "SXSW 2026 Music Schedule — Full Week"
format: agent-readable
source: reddit-community-spreadsheet
---

# SXSW 2026 Music Schedule

> Full week of live music, March 12–18, 2026. Community-sourced from r/sxsw.

## Week Overview

| Day | Date | Acts | Venues | PDF |
|-----|------|------|--------|-----|
`;
  let totalActs = 0;
  for (const d of allDays) {
    totalActs += d.total_acts;
    md += `| ${d.day} | ${d.date} | ${d.total_acts} | ${d.total_venues} | [PDF](${d.pdf}) |\n`;
  }

  md += `\n**Total: ~${totalActs} acts across 7 days.**\n`;

  md += `\n## Per-Day Endpoints\n\n`;
  for (const d of allDays) {
    md += `- \`/music/schedule/${d.date}\` — ${d.day} (${d.total_acts} acts)\n`;
  }

  md += `\n## API\n\n\`\`\`bash\n# Week overview\ncurl -H "Accept: application/json" https://sxsw.md/music/schedule\n\n# Specific day\ncurl -H "Accept: application/json" https://sxsw.md/music/schedule/2026-03-14\n\`\`\`\n`;

  return md;
}

// ── Main ──
const artistsMap = loadArtists();
console.log(`Loaded ${Object.keys(artistsMap).length} featured artists for cross-reference\n`);

const allDays = [];

for (const dayConfig of DAYS) {
  const data = processDay(dayConfig, artistsMap);
  if (!data) continue;

  allDays.push(data);

  // Write per-day JSON
  fs.writeFileSync(
    path.join(distDir, `${data.date}.json`),
    JSON.stringify(data, null, 2)
  );

  // Write per-day Markdown
  fs.writeFileSync(
    path.join(distDir, `${data.date}.md`),
    generateDayMarkdown(data)
  );

  console.log(`✓ ${data.day} ${data.date} — ${data.total_acts} acts, ${data.total_venues} venues`);
}

// Write week overview JSON
const weekOverview = {
  title: 'SXSW 2026 Music Schedule',
  days: allDays.map(d => ({
    date: d.date,
    day: d.day,
    short: d.short,
    total_acts: d.total_acts,
    total_venues: d.total_venues,
    time_blocks: d.time_blocks,
    pdf: d.pdf,
  })),
  total_acts: allDays.reduce((s, d) => s + d.total_acts, 0),
  source: 'reddit-community-spreadsheet',
  lastUpdated: new Date().toISOString().split('T')[0],
};

fs.writeFileSync(path.join(distDir, 'index.json'), JSON.stringify(weekOverview, null, 2));
fs.writeFileSync(path.join(distDir, 'index.md'), generateWeekMarkdown(allDays));

console.log(`\n✓ dist/schedule/index.json (week overview)`);
console.log(`✓ dist/schedule/index.md`);
console.log(`\nSchedule build complete! ${allDays.length} days, ~${weekOverview.total_acts} total acts`);
