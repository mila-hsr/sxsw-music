#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// 1. Extract artists from index.html
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const match = html.match(/const artistsData = (\[.*?\]);/s);
if (!match) { console.error('Could not extract artistsData'); process.exit(1); }
const artists = JSON.parse(match[1]);

// 2. Write artists.json
const artistsJson = {
  artists,
  total: artists.length,
  lastUpdated: '2026-03-05',
  source: 'sxsw.md',
  description: 'SXSW 2026 artists with audio features for agent consumption'
};
fs.writeFileSync(path.join(distDir, 'artists.json'), JSON.stringify(artistsJson, null, 2));
console.log(`✓ dist/artists.json (${artists.length} artists)`);

// 3. Generate index.md
function generateMarkdown(artists) {
  const energyBoost = artists.filter(a => a.spotify_audio_features.avg_energy > 0.7);
  const austinChill = artists.filter(a => a.spotify_audio_features.avg_energy < 0.4 && a.spotify_audio_features.avg_acousticness > 0.4);
  const danceFloor = artists.filter(a => a.spotify_audio_features.avg_danceability > 0.7);
  const feelGood = artists.filter(a => a.spotify_audio_features.avg_valence > 0.7);
  const globalSounds = artists.filter(a => a.is_international);
  const hiddenGems = artists.filter(a => !a.is_international && (a.spotify_followers < 1000000 || a.category === 'hidden_gems'));

  const listArtists = (arr) => arr.map(a => `- **${a.name}** — ${a.genre} (${a.origin})`).join('\n');

  const tableRows = artists.map(a => {
    const f = a.spotify_audio_features;
    return `| ${a.name} | ${a.genre} | ${a.origin} | ${a.tier} | ${f.avg_energy} | ${f.avg_danceability} | ${f.avg_valence} | ${f.avg_tempo} |`;
  }).join('\n');

  return `---
title: SXSW 2026 Music Guide
description: ${artists.length} artists with audio features for discovery and recommendation
lastUpdated: "2026-03-05"
source: sxsw.md
total: ${artists.length}
format: agent-readable
---

# SXSW 2026 Music Guide

> ${artists.length} artists performing at SXSW 2026 with Spotify audio features for mood-based discovery.

## Query Guide

Filter artists by audio features (0.0–1.0 scale):

| Mood | Filter |
|------|--------|
| Energetic | \`energy > 0.7\` |
| Chill | \`energy < 0.4, acousticness > 0.4\` |
| Happy | \`valence > 0.7\` |
| Melancholic | \`valence < 0.3, energy < 0.4\` |
| Danceable | \`danceability > 0.7\` |
| Intense | \`energy > 0.7, valence < 0.4\` |

## Curated Playlists

### 🔥 Energy Boost (${energyBoost.length} artists)
${listArtists(energyBoost)}

### 🌊 Austin Chill (${austinChill.length} artists)
${listArtists(austinChill)}

### 💃 Dance Floor (${danceFloor.length} artists)
${listArtists(danceFloor)}

### 😊 Feel Good (${feelGood.length} artists)
${listArtists(feelGood)}

### 🌍 Global Sounds (${globalSounds.length} artists)
${listArtists(globalSounds)}

### 💎 Hidden Gems (${hiddenGems.length} artists)
${listArtists(hiddenGems)}

## All Artists

| Name | Genre | Origin | Tier | Energy | Dance | Valence | Tempo |
|------|-------|--------|------|--------|-------|---------|-------|
${tableRows}

## API

Get structured JSON: \`?format=json\` or \`Accept: application/json\`

\`\`\`bash
curl -H "Accept: application/json" https://sxsw.md/music
\`\`\`
`;
}

fs.writeFileSync(path.join(distDir, 'index.md'), generateMarkdown(artists));
console.log('✓ dist/index.md');

// 4. Generate index.html (modified from source)
let distHtml = html;

// Add nav bar after <body>
const navHtml = `
    <style>
      .sxsw-nav { max-width: 960px; margin: 0 auto; padding: 1.5rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #2a2a2a; }
      .sxsw-nav .nav-logo { font-size: 1.3rem; font-weight: 700; color: #f5f5f0; text-decoration: none; letter-spacing: -0.02em; }
      .sxsw-nav .nav-logo .dot { color: #c8ff00; }
      .sxsw-nav .nav-links { display: flex; gap: 1.5rem; list-style: none; padding: 0; margin: 0; }
      .sxsw-nav .nav-links a { font-family: 'Space Mono', monospace; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #888; text-decoration: none; transition: color 0.2s; }
      .sxsw-nav .nav-links a:hover, .sxsw-nav .nav-links a.active { color: #c8ff00; }
    </style>
    <nav class="sxsw-nav">
        <a href="https://sxsw.md/" class="nav-logo">SXSW<span class="dot">.</span>md</a>
        <ul class="nav-links">
            <li><a href="https://sxsw.md/news">News</a></li>
            <li><a href="https://sxsw.md/sessions">Sessions</a></li>
            <li><a href="https://sxsw.md/music" class="active">Music</a></li>
            <li><a href="https://sxsw.md/nexus">Nexus</a></li>
        </ul>
    </nav>`;
distHtml = distHtml.replace('<body>', '<body>' + navHtml);

// Add footer before </body>
const footerHtml = `
    <footer style="text-align:center;padding:40px 20px;border-top:1px solid #2a2a2a;margin-top:60px;color:#888;font-family:'Space Grotesk',sans-serif;font-size:0.85rem;">
        <div style="margin-bottom:8px;">
            <a href="https://sxsw.md/" style="color:#c8ff00;text-decoration:none;font-family:'Space Mono',monospace;font-weight:700;">SXSW.md</a>
            <span style="margin:0 8px;">·</span>
            <span>Unofficial SXSW 2026 Guide</span>
        </div>
        <div>Made with data &amp; good vibes</div>
    </footer>`;
distHtml = distHtml.replace('</body>', footerHtml + '\n</body>');

// Replace inline artistsData with fetch
const artistsDataRegex = /const artistsData = \[.*?\];/s;
distHtml = distHtml.replace(artistsDataRegex, `let artistsData = [];

        // Load artists from JSON
        async function loadArtists() {
            try {
                const resp = await fetch('./artists.json');
                const data = await resp.json();
                artistsData = data.artists;
                init();
            } catch(e) {
                console.error('Failed to load artists:', e);
            }
        }
        loadArtists();`);

// Remove the window.addEventListener load init (loadArtists calls init)
distHtml = distHtml.replace("window.addEventListener('load', init);", '// init called by loadArtists()');

fs.writeFileSync(path.join(distDir, 'index.html'), distHtml);
console.log('✓ dist/index.html');

console.log('\nBuild complete!');
