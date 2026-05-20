import 'package:flutter/material.dart';
import 'package:nativesmart_flutter/nativesmart_flutter.dart';

void main() {
  runApp(const ExampleApp());
}

class ExampleApp extends StatefulWidget {
  const ExampleApp({super.key});

  @override
  State<ExampleApp> createState() => _ExampleAppState();
}

class _ExampleAppState extends State<ExampleApp> {
  ThemeMode mode = ThemeMode.light;
  String selectedPayment = 'mtn';
  String otp = '';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      theme: NativesmartTheme.light(),
      darkTheme: NativesmartTheme.dark(),
      themeMode: mode,
      home: Scaffold(
        body: SafeArea(
          child: ListView(
            padding: const EdgeInsets.all(16),
            children: [
              Text('Nativesmart Kitchen Sink', style: Theme.of(context).textTheme.headlineSmall),
              const Text('Flutter demo for UI, forms, payments and transaction states.'),
              const SizedBox(height: 16),
              NsCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Theme preview', style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 8),
                    Row(
                      children: [
                        Expanded(
                          child: NsButton(
                            label: 'Light',
                            onPressed: () => setState(() => mode = ThemeMode.light),
                          ),
                        ),
                        const SizedBox(width: 8),
                        Expanded(
                          child: NsButton(
                            label: 'Dark',
                            onPressed: () => setState(() => mode = ThemeMode.dark),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              NsCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('UI components', style: Theme.of(context).textTheme.titleMedium),
                    const SizedBox(height: 8),
                    const Row(
                      children: [
                        NsAvatar(initials: 'TD'),
                        SizedBox(width: 8),
                        NsBadge(label: 'verified', tone: NsBadgeTone.success),
                        SizedBox(width: 8),
                        NsIconPlaceholder(),
                        SizedBox(width: 8),
                        NsSpinner(),
                      ],
                    ),
                    const SizedBox(height: 12),
                    const NsInput(label: 'Basic input'),
                    const SizedBox(height: 12),
                    NsButton(
                      label: 'Open modal',
                      onPressed: () => NsModal.show(
                        context,
                        const Column(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Modal demo', style: TextStyle(fontWeight: FontWeight.w700)),
                            Text('Reusable bottom-sheet modal placeholder.'),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(height: 12),
                    const NsToast(message: 'Toast preview'),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              NsCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Form demo', style: Theme.of(context).textTheme.titleMedium),
                    const PhoneNumberInput(countryCode: '+221'),
                    const SizedBox(height: 12),
                    const AmountInput(currency: 'XOF'),
                    const SizedBox(height: 12),
                    OtpInput(onChanged: (value) => setState(() => otp = value)),
                    Text('OTP value: ${otp.isEmpty ? 'empty' : otp}'),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              NsCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Payment demo', style: Theme.of(context).textTheme.titleMedium),
                    MobileMoneySelector(
                      providers: const ['mtn', 'orange', 'wave'],
                      selected: selectedPayment,
                      onSelect: (value) => setState(() => selectedPayment = value),
                    ),
                    const NsDivider(),
                    PaymentMethodSelector(
                      providers: const ['cash', 'card', 'mobile money'],
                      selected: selectedPayment,
                      onSelect: (value) => setState(() => selectedPayment = value),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 16),
              const OfflineBanner(),
              const SizedBox(height: 16),
              const NetworkRetryState(),
              const SizedBox(height: 16),
              const KycDocumentUpload(),
              const SizedBox(height: 16),
              const TransactionCard(
                title: 'Wallet top-up',
                reference: 'NS-2026-0001',
                amount: 'NGN 2,500.00',
                status: 'successful',
              ),
              const SizedBox(height: 16),
              const ReceiptView(
                title: 'Wallet top-up',
                reference: 'NS-2026-0001',
                amount: 'NGN 2,500.00',
                status: 'successful',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
