import 'package:flutter/material.dart';

class NsInput extends StatelessWidget {
  const NsInput({super.key, this.controller, this.label, this.keyboardType, this.onChanged});

  final TextEditingController? controller;
  final String? label;
  final TextInputType? keyboardType;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      keyboardType: keyboardType,
      onChanged: onChanged,
      decoration: InputDecoration(labelText: label),
    );
  }
}
