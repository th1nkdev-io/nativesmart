# Flutter

`nativesmart_flutter` provides Flutter themes, tokens, base widgets and business widgets.

## Installation

Inside this monorepo, the example app uses a local path dependency:

```yaml
dependencies:
  nativesmart_flutter:
    path: ../../packages/flutter
```

Run the example with:

```bash
cd apps/example-flutter
flutter pub get
flutter run
```

## Minimal Usage

```dart
import 'package:nativesmart_flutter/nativesmart_flutter.dart';

MaterialApp(
  theme: NativesmartTheme.light(),
  darkTheme: NativesmartTheme.dark(),
  home: const Scaffold(
    body: AmountInput(currency: 'XOF'),
  ),
);
```

## Known Limits

- Flutter tooling must be installed locally to run `flutter analyze` and `flutter test`.
- Token access is prepared with Dart classes; full generated-token import can be tightened in a later pass.
- Widgets are intentionally simple until the example app reveals real product needs.
