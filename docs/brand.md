# NativeSmart Brand

The official NativeSmart logo is the symbol without text, with blue and turquoise
dimensional gradients. The earlier flat, wordmark and cinematic render explorations
in `output/brand/` are not the official identity.

## Source and exports

- Approved artwork: `assets/brand/nativesmart-logo-source.png`.
- Official transparent logo: `public/brand/nativesmart-logo.png` (1024 × 1024).
- Transparent square PNG icons: 16, 32, 48, 64, 128, 192, 256, 512 and 1024 px.
- Browser favicons: 16 and 32 px PNG, plus a multiresolution ICO (16–256 px).
- Apple touch icon: 180 px with an opaque light background.
- Native app icon: 1024 px with an opaque light background, suitable for iOS.
- Android adaptive foreground: 432 px, transparent, padded for the 66/108 safe zone.
- Android legacy launcher icons: mdpi, hdpi, xhdpi, xxhdpi and xxxhdpi.
- Desktop exports: `favicon.ico` for Windows and `nativesmart.icns` for macOS.
- Splash symbol: 512 px, transparent.
- Web manifest: `public/site.webmanifest`, with separate regular and maskable icons.

The source is a raster PNG, not a vector file or an interactive 3D model. Exporting
at 1024 px does not imply extra detail beyond the approved source. Preserve its
silhouette, spacing, gradient colors and proportions. Do not recolor it with the
component playground's active theme, stretch it, or add a background to the
transparent logo. Pair the symbol with accessible text when its meaning is not
already provided by an adjacent heading or link label.

## Regenerate assets

Run `pnpm brand:generate` from the repository root, or run
`python3 tooling/scripts/generate-brand-assets.py` from any directory. Python 3 and
Pillow are required (`python3 -m pip install Pillow` in your Python environment).
The script performs deterministic trimming, alpha cleanup, resizing and padding;
it does not generate a different logo. Only almost invisible alpha noise outside
the approved mark is removed. The original source remains unchanged.

Regular icons retain transparency. Apple and maskable icons use the light brand
background. Maskable exports keep visible artwork within the central safe circle;
do not replace them with the regular icon without this padding.

## Application integration

The showcase and Vue playground serve the root `public/` directory. Their favicon,
Apple icon, manifest and visible logo URLs respect Vite's base path. The generated
documentation site copies the brand assets and manifest into its build output.
Manifest paths are relative so deployments in a subdirectory remain valid.

The Lab shows the logo in its top bar (32 px) and in the home page header (128 px, 72 px on
narrow screens), with `srcset` so it stays sharp on dense screens. It always keeps its own colors,
whatever brand theme or color mode is active.

The React Native and Flutter Kitchen Sink screens show the logo above their title. React Native
reads `public/brand/icon-128.png` directly; Flutter bundles
`apps/mobile/flutter/assets/brand/nativesmart-logo.png`, a copy of `icon-256.png` written by
`pnpm brand:generate`, because Flutter only bundles assets from inside its own package.

The Expo demo uses the official app icon, Android adaptive foreground, splash
symbol and web favicon through `apps/mobile/react-native/app.json`. Native icon
changes require a new native build; they are not visible as an Expo Go launcher
icon. Flutter launcher and desktop exports are available for future platform projects;
their current scaffolds do not contain native launcher targets to configure.

The web manifest supplies application identity and launcher icons. It does not
add offline caching or a service worker.

Android safe-area reference: https://developer.android.com/develop/ui/compose/system/icon_design_adaptive
