import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:nativesmart_flutter/nativesmart_flutter.dart';

void main() {
  testWidgets('NsButton renders its label', (tester) async {
    await tester.pumpWidget(
      MaterialApp(
        theme: NativesmartTheme.light(),
        home: const Scaffold(
          body: NsButton(label: 'Continue'),
        ),
      ),
    );

    expect(find.text('Continue'), findsOneWidget);
  });
}
