import 'package:flutter/material.dart';
import '../tokens/nativesmart_tokens.dart';

class NativesmartTheme {
  static ThemeData light() {
    const primary = NsColors.green600;
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        brightness: Brightness.light,
        primary: primary,
        surface: Colors.white,
      ),
      scaffoldBackgroundColor: const Color(0xfff8fafc),
      inputDecorationTheme: const InputDecorationTheme(
        border: OutlineInputBorder(),
      ),
    );
  }

  static ThemeData dark() {
    const primary = NsColors.green500;
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primary,
        brightness: Brightness.dark,
        primary: primary,
        surface: NsColors.neutral900,
      ),
      scaffoldBackgroundColor: NsColors.neutral950,
      inputDecorationTheme: const InputDecorationTheme(
        border: OutlineInputBorder(),
      ),
    );
  }
}
