import 'package:flutter/material.dart';
import '../widgets/ns_button.dart';
import '../widgets/ns_card.dart';

class KycDocumentUpload extends StatelessWidget {
  const KycDocumentUpload({super.key, this.title = 'Identity document', this.onUpload});

  final String title;
  final VoidCallback? onUpload;

  @override
  Widget build(BuildContext context) {
    return NsCard(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: Theme.of(context).textTheme.titleMedium),
          const Text('Upload a clear photo or scan for verification.'),
          const SizedBox(height: 12),
          NsButton(label: 'Upload document', onPressed: onUpload),
        ],
      ),
    );
  }
}
