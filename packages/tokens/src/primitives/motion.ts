export const motion = {
  /** Durations in milliseconds. */
  duration: {
    instant: 0,
    fastest: 80,
    fast: 120,
    normal: 180,
    moderate: 220,
    slow: 260,
    slower: 400,
    slowest: 600
  },
  easing: {
    /** Default for most transitions. */
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    /** Expressive moves that slightly overshoot. */
    emphasized: "cubic-bezier(0.2, 0, 0, 1.2)",
    /** Expressive entrances: fast start, long soft landing. */
    emphasizedDecelerate: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    /** Expressive exits. */
    emphasizedAccelerate: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    /** Elements entering the screen. */
    decelerate: "cubic-bezier(0, 0, 0, 1)",
    /** Elements leaving the screen. */
    accelerate: "cubic-bezier(0.3, 0, 1, 1)",
    linear: "linear"
  },
  /**
   * Physical springs for SwiftUI, Jetpack Compose, Flutter and Framer Motion. The web gets the same
   * curve sampled into a CSS `linear()` easing.
   */
  spring: {
    gentle: { stiffness: 120, damping: 20, mass: 1 },
    snappy: { stiffness: 320, damping: 30, mass: 1 },
    bouncy: { stiffness: 200, damping: 12, mass: 1 },
    stiff: { stiffness: 500, damping: 45, mass: 1 }
  },
  /** Ready-made pairs of duration and easing, by what the element does. */
  transition: {
    enter: { duration: "normal", easing: "decelerate" },
    exit: { duration: "fast", easing: "accelerate" },
    move: { duration: "moderate", easing: "standard" },
    expand: { duration: "slow", easing: "emphasizedDecelerate" },
    collapse: { duration: "normal", easing: "emphasizedAccelerate" },
    fade: { duration: "fast", easing: "linear" }
  },
  /** Delay between items that animate one after another, in milliseconds. */
  stagger: 40,
  /** Travel of entering and leaving elements, in pixels. */
  distance: {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 32
  }
} as const;

export type DurationKey = keyof typeof motion.duration;
export type EasingKey = keyof typeof motion.easing;
export type SpringName = keyof typeof motion.spring;

/**
 * Position over time of a spring released from 0 toward 1, sampled until it settles. Returns the
 * samples and the settling time in milliseconds.
 */
export function sampleSpring({
  stiffness,
  damping,
  mass
}: {
  stiffness: number;
  damping: number;
  mass: number;
}) {
  const step = 1 / 120;
  let position = 0;
  let velocity = 0;
  const samples: number[] = [0];
  let still = 0;
  for (let time = step; time < 3; time += step) {
    const force = -stiffness * (position - 1) - damping * velocity;
    velocity += (force / mass) * step;
    position += velocity * step;
    samples.push(position);
    still = Math.abs(position - 1) < 0.004 && Math.abs(velocity) < 0.04 ? still + 1 : 0;
    if (still > 6) break;
  }
  return { samples, duration: Math.round(samples.length * step * 1000) };
}
