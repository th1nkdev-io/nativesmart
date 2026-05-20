# Enterprise Integration

Enterprise delivery should customize Nativesmart without forking the foundation unnecessarily.

## Integration Areas

- private theme packs
- API adapters
- auth/session integration
- KYC provider integration
- payment provider integration
- private docs
- private package distribution

## Boundaries

Do not put client-specific code into base packages.

Use:

- adapters
- private packages
- template overlays
- client theme packs

## Future SaaS-Ready Concepts

Prepare for:

- customer portal
- license key management
- team access
- billing
- component analytics
- private docs
- Figma sync
- token dashboard
- visual QA dashboard

Do not build these modules until distribution and support workflows require them.
