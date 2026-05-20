import 'package:flutter/material.dart';
import 'mobile_money_selector.dart';

class PaymentMethodSelector extends StatelessWidget {
  const PaymentMethodSelector({super.key, required this.providers, this.selected, this.onSelect});

  final List<String> providers;
  final String? selected;
  final ValueChanged<String>? onSelect;

  @override
  Widget build(BuildContext context) {
    return MobileMoneySelector(providers: providers, selected: selected, onSelect: onSelect);
  }
}
