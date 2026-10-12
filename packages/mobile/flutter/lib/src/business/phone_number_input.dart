import 'package:flutter/material.dart';
import '../widgets/ns_input.dart';

class PhoneNumberInput extends StatelessWidget {
  const PhoneNumberInput({super.key, this.countryCode = '+234', this.onChanged});

  final String countryCode;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(countryCode, style: const TextStyle(fontWeight: FontWeight.w700)),
        const SizedBox(width: 8),
        Expanded(child: NsInput(keyboardType: TextInputType.phone, onChanged: onChanged)),
      ],
    );
  }
}
