import 'package:flutter/material.dart';
import '../widgets/ns_button.dart';

class MobileMoneySelector extends StatelessWidget {
  const MobileMoneySelector({super.key, required this.providers, this.selected, this.onSelect});

  final List<String> providers;
  final String? selected;
  final ValueChanged<String>? onSelect;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: providers
          .map((provider) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: NsButton(label: provider.toUpperCase(), onPressed: () => onSelect?.call(provider)),
              ))
          .toList(),
    );
  }
}
