/** Stacking layers, from the page up to tooltips. */
export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 400,
  modal: 500,
  popover: 600,
  toast: 800,
  tooltip: 900
} as const;
