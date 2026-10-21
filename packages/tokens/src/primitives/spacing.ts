/**
 * Spacing scale in pixels, on a 4px grid with half steps for tight details. Keys follow the
 * Tailwind spacing scale; a dot becomes a dash in CSS (`--ns-space-0-5`).
 */
export const spacing = {
  0: 0,
  px: 1,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  3.5: 14,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  11: 44,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  40: 160,
  48: 192,
  64: 256
} as const;

export type SpacingKey = keyof typeof spacing;

/**
 * Spacing by intent. Components pick the kind of space they need instead of a raw step:
 * `inset` pads the inside of a box, `stack` separates elements vertically, `inline` horizontally,
 * `section` separates the blocks of a page.
 */
export const spaceUsages = {
  inset: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6, "2xl": 8 },
  stack: { xs: 1, sm: 2, md: 4, lg: 6, xl: 8, "2xl": 12 },
  inline: { xs: 1, sm: 2, md: 3, lg: 4, xl: 6 },
  section: { sm: 12, md: 16, lg: 24, xl: 32 }
} as const satisfies Record<string, Record<string, SpacingKey>>;
