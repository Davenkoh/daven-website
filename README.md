# Daven Koh — interactive personal website

Vite + React 19 + TypeScript + Tailwind v4 + Motion + Zustand. Deployed as a static SPA on Vercel.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build
npm run lint
```

## Deployment

Live at https://davenkoh-website.vercel.app (Vercel project `daven-website`, connected to this GitHub repo). Every push to `main` deploys to production; other branches get preview URLs. `vercel.json` holds the SPA rewrite and cache headers. Manual deploy from this folder: `npx vercel deploy --prod`.

## Modes

- **Room** (interactive): the workspace scene at `/`; Career, Education, Projects, Communities and Contact Me open as panels over the room at `/career`, `/education`, `/projects`, `/communities` and `/contact`.
- **Classic**: the same content as scrollable dark pages. Chosen automatically on phones / touch devices, or with the Room / Classic switch.

## Assets you need to add (placeholders are generated meanwhile)

| File | What | Notes |
|---|---|---|
| `public/room.webp` + `public/room.jpg` | the room image (done: 1672×941, original kept in `assets-src/`) | To swap it, export WebP + JPEG, set `ROOM.width/height` in `src/config/scene.config.ts` and calibrate (below). |
| `public/portraits/daven.webp` | cut-out of you on the chair, facing the camera (in place; also the journey header photo) | transparent background, 1000×1019 (update `PORTRAIT.aspect` if replaced) |
| `public/audio/track-1.mp3` … `track-3.mp3` | lofi tracks (done: three 10-minute sides, 128 kbps) | Titles/artists live in `src/data/tracks.ts`. Keep the ids — topics map to tracks in `src/config/site.config.ts`. To re-cut: `ffmpeg -ss 0 -t 600 -i source.m4a -codec:a libmp3lame -b:a 128k public/audio/track-1.mp3`. |
| `public/photos/avatar.jpg` | small round avatar | used in the nav pill |
| `public/photos/hobby-*.jpg` | hobby photos | wired in `src/data/about.ts` |
| `public/audio/records/rec-1.mp3` … | records for the Contact page turntable | titles/colours in `src/about/player/records.ts`; these pause the room's lofi while they play |
| `public/Daven-Koh-Resume.pdf` | resume | linked from the footer |

Regenerate placeholders with `python3 scripts/placeholders.py --force`.

**Photos on cards:** add `photos: ['/photos/entries/acai-den-1.jpg', '/photos/entries/acai-den-2.jpg']` to an entry in `src/data/*.ts`. The first photo is the card cover; all of them show in the detail dialog. Logos go in `public/logos/` and are referenced with `logo: '/logos/holicay.png'`.

The first visit to the room shows a one-click spotlight tour of everything clickable; it is remembered in `localStorage` under `daven.tourSeen`.

## Calibrating the scene to a new room image

1. Replace `public/room.webp` / `public/room.jpg`, set `ROOM.width` / `ROOM.height` in `src/config/scene.config.ts`.
2. `npm run dev`, enter the room, press **`c`** to open the calibration overlay.
3. Move the mouse to read world-pixel coordinates. **Click** copies `{ x, y }`; **shift-click** several corners to build a polygon (copied as `[[x, y], …]` for `WINDOW.polygons`); **Esc** clears it.
4. Paste the numbers into `HOTSPOTS`, `WINDOW` (one polygon per glass pane), `LAMP`, `VINYL`, `PORTRAIT`, `LAPTOP` (clock position) and `SUMMARY`. Keep everything interactive inside `SAFE`.

## Content

- `src/data/career.ts`, `education.ts`, `projects.ts`, `communities.ts` — entries; `summary`, `context`, `impact`, `result` are the four gallery-card lines, `bullets` the full story in the detail dialog; `tags` drive the GTM / Operations / Software & AI radio chips.
- `src/data/about.ts` — timeline, hobbies, quote, languages, skills.
- `src/config/site.config.ts` — name, taglines, socials, topic → track mapping.

## Deploy

Import the repo in Vercel (framework preset: Vite). `vercel.json` rewrites every route to `index.html` so deep links work.
