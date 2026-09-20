/**
 * Everything that depends on the room image lives here, in ROOM IMAGE PIXELS
 * (the image is 1672 × 941). To re-calibrate after changing the image:
 *   1. set ROOM.width/height to the real pixel size,
 *   2. run the dev server, enter the room, press `c` for the calibration overlay,
 *   3. click objects / shift-click window corners and paste the printed numbers below.
 */

export interface HotspotDef {
  id: string
  label: string
  /** route to open (topic hotspots) */
  to?: string
  /** in-scene action */
  action?: 'lamp'
  x: number
  y: number
  w: number
  h: number
  /** where the "+" dot sits inside the box (0–1) */
  dot?: { x: number; y: number }
}

export const ROOM = { src: '/room.webp', fallback: '/room.jpg', width: 1672, height: 941 }

/** Region that must stay visible at every viewport (cover-cropping never cuts into it). */
export const SAFE = { x: 90, y: 20, w: 1500, h: 900 }

/**
 * Window pane polygon(s) — rain is clipped to these. The right pane has a notch cut
 * around the lamp shade, which stands in front of the glass.
 */
export const WINDOW = {
  polygons: [
    [
      [1048, 0],
      [1566, 0],
      [1566, 288],
      [1500, 288],
      [1500, 422],
      [1566, 422],
      [1566, 478],
      [1048, 478],
    ],
  ] as [number, number][][],
}

export const PORTRAIT = {
  x: 560,
  y: 332,
  w: 520,
  /** height / width of the portrait PNGs */
  aspect: 2000 / 1600,
  /** where the face is inside the frame (0–1) — the head-tracking anchor */
  face: { x: 0.5, y: 0.38 },
  frames: '/portraits',
  ext: 'png',
}
const portraitH = PORTRAIT.w * PORTRAIT.aspect

export const HOTSPOTS: HotspotDef[] = [
  { id: 'career', label: 'Career', to: '/career', x: 405, y: 40, w: 595, h: 320, dot: { x: 0.5, y: 0.5 } },
  { id: 'projects', label: 'Projects', to: '/projects', x: 565, y: 393, w: 315, h: 165, dot: { x: 0.5, y: 0.42 } },
  { id: 'events', label: 'Events I organised', to: '/events', x: 40, y: 65, w: 330, h: 265, dot: { x: 0.5, y: 0.5 } },
  // on the character's chest
  {
    id: 'about',
    label: 'About me',
    to: '/about',
    x: PORTRAIT.x + PORTRAIT.w * 0.3,
    y: PORTRAIT.y + portraitH * 0.5,
    w: PORTRAIT.w * 0.4,
    h: portraitH * 0.28,
    dot: { x: 0.5, y: 0.3 },
  },
  { id: 'lamp', label: 'Lamp', action: 'lamp', x: 1500, y: 288, w: 162, h: 134, dot: { x: 0.5, y: 0.5 } },
]

export const LAMP = {
  /** warm glow centre + radius, world px */
  glow: { x: 1580, y: 370, r: 470 },
  /** the shade, darkened when the lamp is off */
  shade: { x: 1500, y: 288, w: 162, h: 134 },
}

/** Platter circle so the CSS record sits exactly on the drawn turntable; `squash` flattens it to the camera angle. */
export const VINYL = { cx: 256, cy: 516, r: 43, squash: 0.82 }

/** Top-left anchor of the summary card, world px (rendered at screen size, not scaled). */
export const SUMMARY = { x: 1130, y: 500 }
