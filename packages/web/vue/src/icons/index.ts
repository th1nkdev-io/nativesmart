/**
 * Built-in stroke icons, 24 × 24, drawn with currentColor (stroke 2, round caps and joins).
 * Products add or replace icons with `registerIcons`, or pass `icons` to the plugin.
 */
export const defaultIcons = {
  "alert-circle": "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 8v4.5M12 16h.01",
  "alert-triangle":
    "M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0ZM12 9.5v4M12 17h.01",
  "arrow-left": "M19 12H5m6 6-6-6 6-6",
  "arrow-right": "M5 12h14m-6-6 6 6-6 6",
  bell: "M6 9a6 6 0 0 1 12 0c0 6 2.5 7.5 2.5 7.5h-17S6 15 6 9ZM10 20a2.2 2.2 0 0 0 4 0",
  calendar:
    "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM4 10h16M8 3v4M16 3v4",
  check: "M20 6 9 17l-5-5",
  "check-circle": "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM8 12.5l2.7 2.5L16 9.5",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-left": "m15 6-6 6 6 6",
  "chevron-right": "m9 6 6 6-6 6",
  "chevron-up": "m6 15 6-6 6 6",
  clock: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 7v5l3 2",
  close: "M6 6l12 12M18 6 6 18",
  copy: "M9 9h11v11H9ZM5 15H4V4h11v1",
  download: "M12 4v11m-5-5 5 5 5-5M5 20h14",
  edit: "M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16ZM13.5 6.5l4 4",
  "external-link": "M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
  "eye-off":
    "M3 3l18 18M10.6 5.1A10 10 0 0 1 12 5c6.4 0 10 7 10 7a17 17 0 0 1-3 3.8M6.6 6.6C3.8 8.4 2 12 2 12s3.6 7 10 7a9.6 9.6 0 0 0 5.4-1.6M9.9 9.9a3 3 0 0 0 4.2 4.2",
  filter: "M3 5h18l-7 8.5V19l-4 2v-7.5Z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  home: "M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9",
  image:
    "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1ZM9 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM20 15l-5-5L5 20",
  info: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM12 11v5M12 8h.01",
  lock: "M6 11h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1ZM8 11V7a4 4 0 0 1 8 0v4",
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1ZM3 7l9 6 9-6",
  menu: "M4 6h16M4 12h16M4 18h16",
  minus: "M5 12h14",
  "more-horizontal": "M5 12h.01M12 12h.01M19 12h.01",
  phone:
    "M5 4h3.5l1.5 4.5-2.2 1.3a11 11 0 0 0 6.4 6.4l1.3-2.2L20 15.5V19a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z",
  plus: "M12 5v14M5 12h14",
  refresh: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5",
  search: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM20 20l-3.5-3.5",
  send: "M21 3 10 14M21 3l-7 18-4-7-7-4Z",
  settings:
    "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6ZM19.4 13a7.6 7.6 0 0 0 0-2l2-1.6-2-3.4-2.4.9a7.4 7.4 0 0 0-1.7-1L15 3h-4l-.4 2.5a7.4 7.4 0 0 0-1.7 1l-2.4-.9-2 3.4L6.6 11a7.6 7.6 0 0 0 0 2l-2 1.6 2 3.4 2.4-.9a7.4 7.4 0 0 0 1.7 1L11 21h4l.4-2.5a7.4 7.4 0 0 0 1.7-1l2.4.9 2-3.4Z",
  star: "m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9Z",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  upload: "M12 20V9m-5 5 5-5 5 5M5 4h14",
  user: "M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM4 20a8 8 0 0 1 16 0",
  wallet: "M4 6h15a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6Zm0 0 12-3v3M16 13h.01",
  "x-circle": "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18ZM9 9l6 6M15 9l-6 6"
} as const satisfies Record<string, string>;

export type NsIconName = keyof typeof defaultIcons;

const registry = new Map<string, string>(Object.entries(defaultIcons));

/** Adds or replaces icons: `{ name: svgPathData }`, on a 24 × 24 grid. */
export function registerIcons(icons: Readonly<Record<string, string>>) {
  for (const [name, path] of Object.entries(icons)) registry.set(name, path);
}

export function iconPath(name: string) {
  return registry.get(name);
}

export function iconNames() {
  return [...registry.keys()];
}
