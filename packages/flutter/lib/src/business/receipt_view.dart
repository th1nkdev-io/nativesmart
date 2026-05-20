import 'package:flutter/material.dart';
import '../widgets/ns_card.dart';
import '../widgets/ns_divider.dart';
import 'transaction_card.dart';

class ReceiptView extends StatelessWidget {
  const ReceiptView({
    super.key,
    required this.title,
    required this.reference,
    required this.amount,
    required this.status,
  });

  final String title;
  final String reference;
  final String amount;
  final String status;

  @override
  Widget build(BuildContext context) {
    return NsCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Receipt', style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 12),
          const NsDivider(),
          const SizedBox(height: 12),
          TransactionCard(title: title, reference: reference, amount: amount, status: status),
        ],
      ),
    );
  }
}
