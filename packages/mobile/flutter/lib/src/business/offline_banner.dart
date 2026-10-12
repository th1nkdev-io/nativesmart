import 'package:flutter/material.dart';

class OfflineBanner extends StatelessWidget {
  const OfflineBanner({super.key, this.message = 'You are offline. Some actions will sync later.'});

  final String message;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      color: Colors.amber,
      padding: const EdgeInsets.all(8),
      child: Text(message, style: const TextStyle(fontWeight: FontWeight.w700)),
    );
  }
}
