#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir);

// ── 1. Extract artists from index.html ──
const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const match = html.match(/const artistsData = (\[.*?\]);/s);
if (!match) { console.error('Could not extract artistsData'); process.exit(1); }
const artists = JSON.parse(match[1]);

// ── 2. Write artists.json ──
const artistsJson = {
  artists,
  total: artists.length,
  lastUpdated: '2026-03-05',
  source: 'sxsw.md',
  description: 'SXSW 2026 artists with audio features for agent consumption'
};
fs.writeFileSync(path.join(distDir, 'artists.json'), JSON.stringify(artistsJson, null, 2));
console.log(`✓ dist/artists.json (${artists.length} artists)`);

// ── 3. Generate index.md ──
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

### Energy Boost (${energyBoost.length} artists)
${listArtists(energyBoost)}

### Austin Chill (${austinChill.length} artists)
${listArtists(austinChill)}

### Dance Floor (${danceFloor.length} artists)
${listArtists(danceFloor)}

### Feel Good (${feelGood.length} artists)
${listArtists(feelGood)}

### Global Sounds (${globalSounds.length} artists)
${listArtists(globalSounds)}

### Hidden Gems (${hiddenGems.length} artists)
${listArtists(hiddenGems)}

## All Artists

| Name | Genre | Origin | Tier | Energy | Dance | Valence | Tempo |
|------|-------|--------|------|--------|-------|---------|-------|
${tableRows}

## Schedule

Full 7-day show schedule available at \`/music/schedule\`.

\`\`\`bash
curl -H "Accept: application/json" https://sxsw.md/music/schedule
curl -H "Accept: text/markdown" https://sxsw.md/music/schedule/2026-03-14
\`\`\`

## API

Get structured JSON: \`?format=json\` or \`Accept: application/json\`

\`\`\`bash
curl -H "Accept: application/json" https://sxsw.md/music
\`\`\`
`;
}

fs.writeFileSync(path.join(distDir, 'index.md'), generateMarkdown(artists));
console.log('✓ dist/index.md');

// ── 4. Generate index.html (Discover page with nav + footer) ──
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
      .sxsw-sub-nav { max-width: 960px; margin: 0 auto; display: flex; border-bottom: 1px solid #2a2a2a; padding: 0 2rem; }
      .sxsw-sub-nav a { font-family: 'Space Mono', monospace; font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; text-decoration: none; padding: 14px 20px; border-bottom: 2px solid transparent; transition: all 0.2s; }
      .sxsw-sub-nav a:hover { color: #f5f5f0; }
      .sxsw-sub-nav a.active { color: #c8ff00; border-bottom-color: #c8ff00; }
    </style>
    <nav class="sxsw-nav">
        <a href="https://sxsw.md/" class="nav-logo">SXSW<span class="dot">.</span>md</a>
        <ul class="nav-links">
            <li><a href="https://sxsw.md/news">News</a></li>
            <li><a href="https://sxsw.md/sessions">Sessions</a></li>
            <li><a href="/music" class="active">Music</a></li>
            <li><a href="https://sxsw.md/nexus">Nexus</a></li>
        </ul>
    </nav>
    <div class="sxsw-sub-nav">
        <a href="/music" class="active">Discover</a>
        <a href="/music/schedule">Schedule</a>
    </div>`;
distHtml = distHtml.replace('<body>', '<body>' + navHtml);

// Add footer + agent hint before </body>
const footerHtml = `
    <p style="font-family:'Space Mono',monospace;font-size:11px;color:#444;text-align:center;margin-top:24px;padding:0 20px;">Are you an AI agent? Request this URL with <code style="color:#666;background:#1a1a1a;padding:2px 6px;border-radius:3px;font-size:10px;">Accept: text/markdown</code> or via <code style="color:#666;background:#1a1a1a;padding:2px 6px;border-radius:3px;font-size:10px;">curl</code> to get structured artist data with audio features.</p>
    <footer style="max-width:960px;margin:36px auto 0;padding:28px 2rem;border-top:1px solid #2a2a2a;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;">
        <div>
            <a href="https://sxsw.md/" style="color:#c8ff00;text-decoration:none;font-family:'Space Mono',monospace;font-weight:700;">SXSW<span style="color:#c8ff00;">.</span>md</a>
        </div>
        <div style="font-family:'Space Mono',monospace;font-size:0.7rem;color:#555;">
            Curated by agents. Directed by humans. Austin, March 2026.
        </div>
        <div style="width:100%;font-family:'Space Mono',monospace;font-size:0.6rem;color:#333;text-align:center;margin-top:4px;">
            Independent project. Not affiliated with SXSW, LLC.
        </div>
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

// ── 5. Build schedule (CSV → JSON + Markdown) ──
console.log('\n── Building schedule ──');
try {
  execSync('node build-schedule.js', { cwd: __dirname, stdio: 'inherit' });
} catch(e) {
  console.error('Schedule build failed:', e.message);
}

// ── 6. Generate schedule HTML ──
const scheduleDistDir = path.join(distDir, 'schedule');
if (!fs.existsSync(scheduleDistDir)) fs.mkdirSync(scheduleDistDir, { recursive: true });

const scheduleHtml = fs.readFileSync(path.join(__dirname, 'schedule.html'), 'utf8');
fs.writeFileSync(path.join(scheduleDistDir, 'index.html'), scheduleHtml);
console.log('✓ dist/schedule/index.html');

// ── 7. Copy data files (venues, etc.) ──
const dataDir = path.join(__dirname, 'data');
const distDataDir = path.join(distDir, 'data');
if (fs.existsSync(dataDir)) {
  if (!fs.existsSync(distDataDir)) fs.mkdirSync(distDataDir, { recursive: true });
  for (const f of fs.readdirSync(dataDir)) {
    fs.copyFileSync(path.join(dataDir, f), path.join(distDataDir, f));
  }
  console.log('✓ dist/data/ (venues)');
}

console.log('\nBuild complete!');
