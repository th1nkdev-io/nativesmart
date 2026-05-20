import 'package:flutter/material.dart';
import '../widgets/ns_input.dart';

class AmountInput extends StatelessWidget {
  const AmountInput({super.key, this.currency = 'NGN', this.onChanged});

  final String currency;
  final ValueChanged<String>? onChanged;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Text(currency, style: const TextStyle(fontWeight: FontWeight.w700)),
        const SizedBox(width: 8),
        Expanded(child: NsInput(keyboardType: TextInputType.number, onChanged: onChanged)),
      ],
    );
  }
}
