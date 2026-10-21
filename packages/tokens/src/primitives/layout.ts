/** Responsive grid per breakpoint: columns, gutter between them and outer margin, in pixels. */
export const grid = {
  xs: { minWidth: 0, columns: 4, gutter: 16, margin: 16 },
  sm: { minWidth: 640, columns: 8, gutter: 16, margin: 24 },
  md: { minWidth: 768, columns: 8, gutter: 24, margin: 32 },
  lg: { minWidth: 1024, columns: 12, gutter: 24, margin: 32 },
  xl: { minWidth: 1280, columns: 12, gutter: 32, margin: 40 },
  "2xl": { minWidth: 1536, columns: 12, gutter: 32, margin: 48 }
} as const;

export type GridBreakpoint = keyof typeof grid;

/** Sizes of the application frame, in pixels. */
export const chrome = {
  appBar: { compact: 56, regular: 64, large: 112 },
  toolbar: 48,
  bottomBar: 64,
  tabBar: 56,
  sidebar: { collapsed: 72, regular: 280, wide: 320 },
  drawer: { sm: 320, md: 400, lg: 560 },
  /** Width of a side panel next to the content, such as a table of contents. */
  aside: 280
} as const;

/** Safe areas of notched and rounded screens, read from the device. */
export const safeAreas = ["top", "right", "bottom", "left"] as const;
