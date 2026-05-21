import React from "react";
import { describe, expect, it, vi } from "vitest";
import TestRenderer, { act } from "react-test-renderer";
import { NativesmartProvider } from "../theme";
import { Button } from "./Button";

vi.mock("react-native", () => ({
  ActivityIndicator: "ActivityIndicator",
  Pressable: "Pressable",
  Text: "Text"
}));

describe("Button", () => {
  it("renders a label and handles press", () => {
    const onPress = vi.fn();
    let view!: TestRenderer.ReactTestRenderer;

    act(() => {
      view = TestRenderer.create(
        <NativesmartProvider>
          <Button label="Continue" onPress={onPress} />
        </NativesmartProvider>
      );
    });
    act(() => {
      view.root.findByType("Pressable").props.onPress();
    });

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(view.root.findByType("Text").props.children).toBe("Continue");
  });

  it("exposes loading as busy and disables presses", () => {
    const onPress = vi.fn();
    let view!: TestRenderer.ReactTestRenderer;

    act(() => {
      view = TestRenderer.create(
        <NativesmartProvider>
          <Button label="Pay" loading onPress={onPress} />
        </NativesmartProvider>
      );
    });
    const pressable = view.root.findByType("Pressable");

    expect(pressable.props.accessibilityState).toMatchObject({
      busy: true,
      disabled: true
    });
    expect(pressable.props.disabled).toBe(true);
  });
});
