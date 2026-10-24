/**
 * Third dimension: CSS 3D transforms on the web, and scenes rendered with three.js, SceneKit,
 * RealityKit, Filament or Flutter's 3D engines. Lengths are pixels (points, dp), angles degrees.
 */
export const depth = {
  /** Distance between the viewer and the z = 0 plane. Shorter is more dramatic. */
  perspective: {
    near: 600,
    normal: 1000,
    far: 1600,
    flat: 2400
  },
  /** Z offsets of stacked layers: parallax, exploded views, floating cards. */
  layer: {
    0: 0,
    1: 8,
    2: 16,
    3: 32,
    4: 64,
    5: 128
  },
  /** Maximum tilt of a card that follows the pointer or the gyroscope. */
  tilt: {
    subtle: 4,
    normal: 8,
    strong: 14
  },
  /** Vertical field of view of the scene camera. */
  fov: {
    narrow: 30,
    normal: 45,
    wide: 60,
    ultra: 75
  },
  /** Three-point lighting, intensities relative to a physical sun of 1. */
  lights: {
    key: { intensity: 1.4, azimuth: -35, elevation: 40 },
    fill: { intensity: 0.5, azimuth: 45, elevation: 15 },
    rim: { intensity: 0.9, azimuth: 160, elevation: 30 },
    ambient: { intensity: 0.25, azimuth: 0, elevation: 90 }
  },
  /** Physically based materials, as glTF describes them. */
  pbr: {
    matte: { roughness: 0.9, metalness: 0, transmission: 0 },
    satin: { roughness: 0.5, metalness: 0, transmission: 0 },
    glossy: { roughness: 0.15, metalness: 0, transmission: 0 },
    metal: { roughness: 0.35, metalness: 1, transmission: 0 },
    chrome: { roughness: 0.05, metalness: 1, transmission: 0 },
    glass: { roughness: 0.05, metalness: 0, transmission: 1 }
  },
  /** How a scene answers the pointer. */
  interaction: {
    /** Share of the pointer movement applied to parallax layers. */
    parallax: { subtle: 0.02, normal: 0.05, strong: 0.1 },
    /** Inertia of orbit controls: lower glides longer. */
    orbitDamping: 0.08,
    /** Seconds for one full turn when a model rotates on its own. */
    autoRotate: { slow: 40, normal: 20, fast: 10 }
  },
  /** Soft shadow under a floating object. */
  contactShadow: { opacity: 0.35, blur: 24, offset: 12 },
  /** Gentle bob of floating objects: amplitude in pixels, period in milliseconds. */
  float: { amplitude: 8, period: 6000 }
} as const;

export type PbrMaterial = keyof typeof depth.pbr;
