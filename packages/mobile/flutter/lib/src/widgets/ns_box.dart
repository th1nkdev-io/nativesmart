import 'package:flutter/material.dart';

class NsBox extends StatelessWidget {
  const NsBox({super.key, required this.child, this.padding, this.color});

  final Widget child;
  final EdgeInsetsGeometry? padding;
  final Color? color;

  @override
  Widget build(BuildContext context) {
    return Container(padding: padding, color: color, child: child);
  }
}
