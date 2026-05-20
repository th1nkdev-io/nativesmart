import 'package:flutter/material.dart';

class OtpInput extends StatelessWidget {
  const OtpInput({super.key, this.length = 6, this.onChanged});

  final int length;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    final values = List<String>.filled(length, '');
    return Row(
      children: List.generate(length, (index) {
        return Expanded(
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 4),
            child: TextField(
              maxLength: 1,
              textAlign: TextAlign.center,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(counterText: ''),
              onChanged: (value) {
                values[index] = value;
                onChanged?.call(values.join());
              },
            ),
          ),
        );
      }),
    );
  }
}
