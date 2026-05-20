import 'package:flutter/material.dart';

class NsModal extends StatelessWidget {
  const NsModal({super.key, required this.child});

  final Widget child;

  static Future<T?> show<T>(BuildContext context, Widget child) {
    return showModalBottomSheet<T>(
      context: context,
      showDragHandle: true,
      builder: (_) => NsModal(child: child),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(padding: const EdgeInsets.all(16), child: child);
  }
}
