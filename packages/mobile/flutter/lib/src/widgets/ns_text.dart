import 'package:flutter/material.dart';

class NsText extends StatelessWidget {
  const NsText(this.data, {super.key, this.style, this.muted = false});

  final String data;
  final TextStyle? style;
  final bool muted;

  @override
  Widget build(BuildContext context) {
    final color = muted
        ? Theme.of(context).colorScheme.onSurfaceVariant
        : Theme.of(context).colorScheme.onSurface;
    return Text(data, style: TextStyle(color: color).merge(style));
  }
}
