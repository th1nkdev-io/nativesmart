/** Border widths, styles and the focus ring geometry, in pixels. */
export const borders = {
  width: {
    none: 0,
    thin: 1,
    thick: 2,
    heavy: 4
  },
  style: {
    solid: "solid",
    dashed: "dashed",
    dotted: "dotted"
  },
  focusRing: {
    width: 2,
    offset: 2
  }
} as const;
