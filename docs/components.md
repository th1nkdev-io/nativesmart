# Components

Nativesmart separates generic UI components from business components.

Generic components should be reusable in many apps and should avoid product-specific assumptions.

## React Native UI

```txt
Button
Text
Box
Card
Input
Badge
Avatar
Modal
Toast
Divider
Spinner
IconPlaceholder
```

## Flutter UI

```txt
NsButton
NsText
NsBox
NsCard
NsInput
NsBadge
NsAvatar
NsModal
NsToast
NsDivider
NsSpinner
NsIconPlaceholder
```

## Principles

- Use tokens for color, spacing, radius and typography.
- Keep APIs small and typed.
- Support disabled, loading and error states where relevant.
- Prefer platform idioms over forced API parity.
- Keep visual behavior coherent between React Native and Flutter.
