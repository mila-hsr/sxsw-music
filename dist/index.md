---
title: "SXSW 2026 Music — Playlist Recommender"
description: "197 artists with Spotify audio features. Query by mood, energy, genre."
type: music-recommender
version: "1.1"
date: 2026-03-05
artists_count: 197
data_url: "/music/artists.json"
human_url: "https://sxsw.md/music"
content_negotiation:
  json: "/music/artists.json"
  markdown: "/music?format=md"
  html: "/music"
---

# SXSW 2026 Music Playlist Recommender

## How to use this data (for AI agents)

1. **Fetch** `/music/artists.json` for structured artist data
2. **Filter** by audio features, genre, mood, or tier
3. **Recommend** using `spotify_url` field (opens Spotify search for the artist)
4. **Personalize** by asking the user their preferences and matching to audio features

> Each artist has: name, genre, origin, tier, mood, energy, spotify_audio_features (avg_energy, avg_valence, avg_danceability, avg_tempo, avg_acousticness), spotify_popularity, spotify_url

## Query guide
- **Energetic**: energy>0.7, tempo>120
- **Chill**: energy<0.4, acousticness>0.4
- **Happy**: valence>0.7
- **Melancholic**: valence<0.3, energy<0.5
- **Danceable**: danceability>0.7
- **Headliners**: tier="headliner"
- **International**: is_international=true

## Curated playlists (pre-built mood filters)
- 🔥 **High Energy** — energy>0.7: party, festival, workout
- 😌 **Chill Vibes** — energy<0.4, acousticness>0.4: relax, study
- 💃 **Dance Floor** — danceability>0.7: clubs, dancing
- 🌧️ **Melancholic** — valence<0.3: introspective, rainy day
- 😊 **Feel Good** — valence>0.7: happy, upbeat
- 🌍 **Global** — is_international=true: world music, diverse

## Full artist database

| name | tier | genre | origin | energy | dance | valence | tempo | acoustic | popularity |
|------|------|-------|--------|--------|-------|---------|-------|----------|------------|
| Adrian Activo | local | Latin/Alternative | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Agent 007" | local | DJ/Punk | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Aitchdub | local | DJ/House/Techno | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Alma Muñeca | local | Latin/Synthpop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Almost Heaven | local | Pop/Electronic | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Anastasia Hera | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Andrea Daniela | local | Latin/Regional Mexican | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Andrew Cashen | local | Soul/Classic Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Andy Arthur Smith | local | Pop/Funk | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Annabelle Chairlegs | local | Rock/Psychedelic | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Barb | local | Pop/Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Bartly | local | Soul/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Bayonne | local | Electronic Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Ben Buck | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Bettysoo | local | Folk/Singer-Songwriter | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Big Bill | local | Rock/Punk | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| BigXthaPlug | headliner | Hip-Hop/Rap | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Blakchyl | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Bollyflow | local | Dance | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Boogietraxx | local | DJ/Disco | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Brodie Lane | local | Singer-Songwriter/Alternative | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Bubba Lucky | local | Rock Country | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Calder Allen | local | Country/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Caleb Lemons | local | R&B/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Caleb de Casper | local | Pop/Dance | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Camila Rivers | local | R&B/Neo Soul | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Cari Hutson | local | Rock/Blues | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Cazayoux | local | Funk/Afrobeat | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Cha'Keeta B | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Charley Crockett | headliner | Country/Americana | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Chief Cleopatra | local | Rock/Indie Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Clova | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| College of Hip Hop Knowledge | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Commercial Breaks | local | Rock/Power Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Cormae | local | Punk/Garage | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ AG | wave2 | DJ/Hip-Hop | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ Anupi | local | DJ/Fusion | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ Garty | local | DJ/Dance | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ Grip | local | Hip-Hop/House | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ Gulf of Mexico | local | Latin/Regional Mexican | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ Hella Yella | local | DJ/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ JESTER THE FILIPINO FIST | local | DJ | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DJ Napalm | local | DJ/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DR Dak | local | Electronic/House | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Daiistar | local | Rock/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Daniel Fears | local | R&B/Singer-Songwriter | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Dannyritmo | local | DJ/Reggaeton | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| DeVotchKa | featured | Indie/World | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Decasa | local | Latin/Alternative | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Deloyd Elze | wave2 | R&B/Soul | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Devin the Dude | featured | Hip-Hop | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Die Slo | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Don Esco | local | Latin/Electronic | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Don Toliver | headliner | Hip-Hop/R&B | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Dual Core | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| EddieAngel | local | R&B/Soul | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Electra Hernández | wave2 | Latin/Electronic | Mexico | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Elijah Delgado | local | Rock/Indie Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Faaris | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Fifi Knifefight | local | Punk | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Foolish TY | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Fuerza Regida | headliner | Regional Mexican | USA/Mexico | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Geto Gala | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Glass Mansions | local | Rock/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Glaze | local | Rock/Shoegaze | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Gogol Bordello | headliner | Punk Rock/Klezmer | USA/Ukraine | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Grace Sorensen | local | R&B/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Graham Reynolds | local | Classical/Avant | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Grandmaster | local | Funk/Jazz | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Grocery Bag | local | Rock/Garage | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Grupo Salvaje | local | Latin/Cumbia | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Gummy Fang | local | Rock/Indie | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Gus Baldwin | local | Rock/Power Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Haha Laughing | local | Avant/Experimental | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Hannah Cohen | wave2 | Singer-Songwriter | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Honey Made | local | R&B/Soul | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Ideal Collective | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Important Group | local | Rock/Lo-Fi | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Isak Thomas and the Stoop Boys | local | Soul | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Isis Destiny | local | R&B/Dream Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| J Soulja | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| J'Cuuzi | local | Avant/Experimental | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| J'Ray | local | Singer-Songwriter/Afrobeats | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| J-Nice the Kingdom Builder | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| JLQ | local | Americana/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jadarrion | local | DJ/House | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jamie Dred | local | Caribbean/African | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jason Cuellar | local | Latin/Cumbia | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Javiera Electra | wave2 | Electronic/Latin | Chile | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jenna Shaw | local | DJ/Electronic | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jillian Hudson | local | Country/Acoustic | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jim-E-O | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Joe Patitucci | local | Electronic/Ambient | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Joel Loredo | local | Latin/Regional Mexican | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jon Langford of Mekons | featured | Punk/Alt Country | UK/USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Jordan Walsh | local | Classical/Avant | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Joshua Ray Walker | featured | Country/Americana | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Julie Nolen | local | Americana/Alt Country | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Junerise | local | Rock/Dream Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Junior H | headliner | Latin Trap/Hip-Hop | USA/Mexico | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Just Jim | local | DJ/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Kaash Paige | featured | R&B/Hip-Hop | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Kodie Shane | featured | Hip-Hop/Pop | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Kydd Jones | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| LILJAYFROMDAO | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| LLUVII | local | Latin/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Larry Seaman | local | Rock/Indie | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Leo Von Sol | local | Pop/R&B | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Leonilo Jaimes | local | Latin/Regional Mexican | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Lew Apollo | local | R&B/Indie Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Lola Tried | local | Punk/Garage | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Lola Young | headliner | Pop/Soul | UK | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Los Desechos | local | Latin/Cumbia | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Los Gatos 512 | local | Latin/Cumbia | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Los Lobos | headliner | Rock/Latin | USA (LA) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Louiev T | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| MARCO PLUS | wave2 | Experimental | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| MILHD | local | Pop/Indie Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Magic Rockers of Texas | local | Rock/Power Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mama Duke | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Marissa Nadler | featured | Folk/Dream Pop | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Marley Hale | local | Americana/Alt Country | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Marry Cherry | local | Rock/Alternative | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Maru Haru | local | Rock/Orchestral | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mass Minor | local | Rock/Alternative | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mau Mau Chaplains | local | Reggae/Ska | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mau P | featured | Electronic/House | Netherlands | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Maya Sampleton | local | R&B/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Miguel Ortiz Y El Nuevo Estilo | local | Tejano/Regional Mexican | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Modeselektor | featured | Electronic/Experimental | Germany | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Montclair | local | Americana/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mr. Lewis & The Funeral 5 | local | Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mugger | local | Punk/Hardcore | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Mélat | local | R&B/Soul | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Next of Kin | local | Country/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Night Drive | local | Electronic/New Wave | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| OG Ron C | featured | Hip-Hop/DJ | USA (TX) | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Odanga | local | Singer-Songwriter/Afrobeats | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Orya | local | DJ/Dance | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Oscar Ortiz | wave2 | Regional Mexican | Mexico | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Otis Wilkins | local | Rock/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| PROMQUEEN | local | Pop/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Panoramic Voices | local | Classical/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Parker Woodland | local | Rock/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Passion Pit | headliner | Indie Electronic | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Pat G | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Patrice Pike Band | local | Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Pedal Steel Noah | local | Rock/Alt Country | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Peelander-Z | local | Punk/Pop Punk | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Prissy P | local | DJ/R&B | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Quentin | local | Rock/Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Ras Mundi | local | Reggae/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Sassy 009 | wave2 | Electronic Pop | Norway | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Satalights | local | Rock/Alternative | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Sertified | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Sexpop | local | Pop/Funk | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Shai Gabriel | local | Country/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Shallowater | featured | Electronic | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| She23 | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Slomo Drags | local | Rock/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Somebody Someone | local | Pop/Dream Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Soundmass | local | Rock/Jazz | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Southside Hippie | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Spacegoonz | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Stalefish | local | Rock/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Subpar Snatch | local | Punk/Garage | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Susannah Joffe | local | Pop/Dream Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Suxxy Puxxy | local | DJ/Reggaeton | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| TTSSFU | wave2 | Punk | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Texas String Assembly | local | Americana/Bluegrass | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The All-American Rejects | headliner | Pop Punk/Emo | USA | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Animeros | local | Latin/Cumbia | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Droptines | local | Alt Country/Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Eric Hisaw Band | local | Rock/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Point. | local | Avant/Experimental | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Red Eye Gamblers | local | Rock/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Reverent Few | local | Americana/Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Tiarras | local | Rock/Indie Pop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| The Tubs | featured | Indie Rock | UK | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Theo Lawrence | local | Country/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Thunderosa | local | Rock/Hard Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Timothy Howls | local | Country/Americana | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Tomar and the FCs | local | Soul | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Troy Campbell | local | Singer-Songwriter/Alt Country | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Vertarias | local | Pop/R&B | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Very Necessary | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Vintage Jay | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Water Damage | local | Avant/Experimental | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| West Texas Exiles | local | Americana/Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Whisper | local | Rock/Shoegaze | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Wiardon | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Worship Music DJs | local | DJ/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| XBValentine | local | R&B/Hip-Hop | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Yes Sir, No Sir. | local | Rock/Indie Rock | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Young Clean | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Yung Bryse | local | Hip-Hop/Rap | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |
| Zeñal Nortex | local | Latin/Norteño | Austin, TX | 0.00 | 0.00 | 0.00 | 0 | 0.00 | 0 |

---
*Generated by Mila (HSR) — March 2026*
