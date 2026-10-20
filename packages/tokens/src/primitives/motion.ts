export const motion = {
  /** Durations in milliseconds. */
  duration: {
    instant: 0,
    fast: 120,
    normal: 180,
    slow: 260,
    slower: 400
  },
  easing: {
    /** Default for most transitions. */
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    /** Expressive moves that slightly overshoot. */
    emphasized: "cubic-bezier(0.2, 0, 0, 1.2)",
    /** Elements entering the screen. */
    decelerate: "cubic-bezier(0, 0, 0, 1)",
    /** Elements leaving the screen. */
    accelerate: "cubic-bezier(0.3, 0, 1, 1)",
    linear: "linear"
  }
} as const;
