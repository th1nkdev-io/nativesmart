import 'package:flutter/material.dart';
import 'package:nativesmart_flutter/nativesmart_flutter.dart';

void main() {
  runApp(const ExampleApp());
}

class ExampleApp extends StatelessWidget {
  const ExampleApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: NativesmartTheme.light(),
      home: const Scaffold(
        body: SafeArea(
          child: Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              children: [
                OfflineBanner(),
                SizedBox(height: 16),
                TransactionCard(
                  title: 'Wallet top-up',
                  reference: 'NS-2026-0001',
                  amount: 'NGN 2,500.00',
                  status: 'successful',
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
