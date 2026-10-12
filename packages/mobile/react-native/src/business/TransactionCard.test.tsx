import React from "react";
import { describe, expect, it, vi } from "vitest";
import TestRenderer, { act } from "react-test-renderer";
import { NativesmartProvider } from "../theme";
import { TransactionCard } from "./TransactionCard";

vi.mock("react-native", () => ({
  Pressable: "Pressable",
  View: "View",
  Text: "Text"
}));

const transaction = {
  id: "txn_001",
  title: "Wallet top-up",
  reference: "NS-2026-0001",
  amount: { amountMinor: 250000, currency: "NGN" },
  status: "successful" as const,
  createdAt: "2026-05-21T08:30:00.000Z"
};

describe("TransactionCard", () => {
  it("renders transaction details", () => {
    let view!: TestRenderer.ReactTestRenderer;

    act(() => {
      view = TestRenderer.create(
        <NativesmartProvider>
          <TransactionCard transaction={transaction} />
        </NativesmartProvider>
      );
    });
    const textValues = view.root.findAllByType("Text").map((node) => node.props.children);

    expect(textValues).toContain("Wallet top-up");
    expect(textValues).toContain("NS-2026-0001");
    expect(textValues).toContain("successful");
  });

  it("handles card presses when interactive", () => {
    const onPress = vi.fn();
    let view!: TestRenderer.ReactTestRenderer;

    act(() => {
      view = TestRenderer.create(
        <NativesmartProvider>
          <TransactionCard transaction={transaction} onPress={onPress} />
        </NativesmartProvider>
      );
    });
    act(() => {
      view.root.findByType("Pressable").props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
