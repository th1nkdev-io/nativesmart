import 'package:flutter/material.dart';
import '../widgets/ns_badge.dart';
import '../widgets/ns_card.dart';

class TransactionCard extends StatelessWidget {
  const TransactionCard({
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
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          Text(reference, style: Theme.of(context).textTheme.bodySmall),
          const SizedBox(height: 8),
          Text(amount, style: Theme.of(context).textTheme.titleLarge),
          const SizedBox(height: 8),
          NsBadge(label: status),
        ],
      ),
    );
  }
}
