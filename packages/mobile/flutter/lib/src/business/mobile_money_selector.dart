import 'package:flutter/material.dart';

class MobileMoneySelector extends StatelessWidget {
  const MobileMoneySelector({super.key, required this.providers, this.selected, this.onSelect});

  final List<String> providers;
  final String? selected;
  final ValueChanged<String>? onSelect;

  @override
  Widget build(BuildContext context) {
    final scheme = Theme.of(context).colorScheme;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: providers
          .map((provider) => Padding(
                padding: const EdgeInsets.only(bottom: 8),
                child: OutlinedButton(
                  style: OutlinedButton.styleFrom(
                    backgroundColor: selected == provider ? scheme.primaryContainer : null,
                    foregroundColor: selected == provider ? scheme.onPrimaryContainer : null,
                  ),
                  onPressed: () => onSelect?.call(provider),
                  child: Text(provider.toUpperCase()),
                ),
              ))
          .toList(),
    );
  }
}
