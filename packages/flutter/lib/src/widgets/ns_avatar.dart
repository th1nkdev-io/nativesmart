import 'package:flutter/material.dart';

class NsAvatar extends StatelessWidget {
  const NsAvatar({super.key, this.initials = 'NS', this.size = 40});

  final String initials;
  final double size;

  @override
  Widget build(BuildContext context) {
    return CircleAvatar(
      radius: size / 2,
      child: Text(initials, style: const TextStyle(fontWeight: FontWeight.w700)),
    );
  }
}
