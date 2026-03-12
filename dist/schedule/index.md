---
title: "SXSW 2026 Music Schedule — Full Week"
format: agent-readable
source: reddit-community-spreadsheet
---

# SXSW 2026 Music Schedule

> Full week of live music, March 12–18, 2026. Community-sourced from r/sxsw.

## Week Overview

| Day | Date | Acts | Venues | PDF |
|-----|------|------|--------|-----|
| Thursday | 2026-03-12 | 273 | 44 | [PDF](https://static.sxsw.md/files/sxsw2026-music-thu12.pdf) |
| Friday | 2026-03-13 | 345 | 58 | [PDF](https://static.sxsw.md/files/sxsw2026-music-fri13.pdf) |
| Saturday | 2026-03-14 | 364 | 60 | [PDF](https://static.sxsw.md/files/sxsw2026-music-sat14.pdf) |
| Sunday | 2026-03-15 | 341 | 53 | [PDF](https://static.sxsw.md/files/sxsw2026-music-sun15.pdf) |
| Monday | 2026-03-16 | 257 | 47 | [PDF](https://static.sxsw.md/files/sxsw2026-music-mon16.pdf) |
| Tuesday | 2026-03-17 | 270 | 45 | [PDF](https://static.sxsw.md/files/sxsw2026-music-tue17.pdf) |
| Wednesday | 2026-03-18 | 213 | 38 | [PDF](https://static.sxsw.md/files/sxsw2026-music-wed18.pdf) |

**Total: ~2063 acts across 7 days.**

## Per-Day Endpoints

- `/music/schedule/2026-03-12` — Thursday (273 acts)
- `/music/schedule/2026-03-13` — Friday (345 acts)
- `/music/schedule/2026-03-14` — Saturday (364 acts)
- `/music/schedule/2026-03-15` — Sunday (341 acts)
- `/music/schedule/2026-03-16` — Monday (257 acts)
- `/music/schedule/2026-03-17` — Tuesday (270 acts)
- `/music/schedule/2026-03-18` — Wednesday (213 acts)

## API

```bash
# Week overview
curl -H "Accept: application/json" https://sxsw.md/music/schedule

# Specific day
curl -H "Accept: application/json" https://sxsw.md/music/schedule/2026-03-14
```
