/** Accessibility thresholds every component and brand theme is held to. */
export const accessibility = {
  /** Contrast ratios (WCAG 2.2). */
  contrast: {
    /** Body text, level AA. */
    text: 4.5,
    /** Text from 24px, or 18.66px bold. */
    largeText: 3,
    /** Borders, icons and focus indicators (1.4.11). */
    ui: 3,
    /** Level AAA, for long reading. */
    enhanced: 7
  },
  /** Smallest text the components use, in pixels. */
  minimumFontSize: 11,
  /** Text fields stay at 16px on phones so iOS does not zoom when they get focus. */
  inputFontSize: 16,
  /** Minimum spacing between two separate touch targets, in pixels. */
  targetSpacing: 8,
  /** Longest an animation may last before it must be pausable (2.2.2), in milliseconds. */
  maxAutoplay: 5000,
  /** Flashes per second never reached (2.3.1). */
  maxFlashes: 3
} as const;
