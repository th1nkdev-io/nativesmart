import 'package:flutter/material.dart';

enum NsBadgeTone { neutral, success, warning, danger }

class NsBadge extends StatelessWidget {
  const NsBadge({super.key, required this.label, this.tone = NsBadgeTone.neutral});

  final String label;
  final NsBadgeTone tone;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    final color = switch (tone) {
      NsBadgeTone.success => Colors.green,
      NsBadgeTone.warning => Colors.orange,
      NsBadgeTone.danger => scheme.error,
      NsBadgeTone.neutral => scheme.onSurfaceVariant,
    };
    return Chip(
      label: Text(label, style: TextStyle(color: color)),
      side: BorderSide.none,
      backgroundColor: scheme.surfaceContainerHighest,
    );
  }
}
