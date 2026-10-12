import 'package:flutter/material.dart';
import '../widgets/ns_button.dart';
import '../widgets/ns_card.dart';

class NetworkRetryState extends StatelessWidget {
  const NetworkRetryState({
    super.key,
    this.title = 'Connection issue',
    this.description = 'Check your network and try again.',
    this.onRetry,
  });

  final String title;
  final String description;
  final VoidCallback? onRetry;

  @override
  Widget build(BuildContext context) {
    return NsCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          Text(description),
          const SizedBox(height: 12),
          NsButton(label: 'Retry', onPressed: onRetry),
        ],
      ),
    );
  }
}
