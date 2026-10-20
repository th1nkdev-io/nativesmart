# Tooling Scripts

Shared automation scripts live here when they are too specific for package-level scripts.

- `generate-brand-assets.py`: export the official logo, web manifest, browser favicons,
  Apple/Android launcher icons and desktop icons from the approved source. Run
  `pnpm brand:generate` with Python 3 and Pillow installed. See `docs/brand.md`.

Planned scripts:

- token validation
- release readiness checks
- template smoke tests
- generated file drift checks
