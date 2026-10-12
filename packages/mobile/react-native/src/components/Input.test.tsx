import React from "react";
import { describe, expect, it } from "vitest";
import { vi } from "vitest";
import TestRenderer, { act } from "react-test-renderer";
import { NativesmartProvider } from "../theme";
import { Input } from "./Input";

vi.mock("react-native", () => ({
  TextInput: "TextInput"
}));

describe("Input", () => {
  it("renders placeholders with themed colors", () => {
    let view!: TestRenderer.ReactTestRenderer;

    act(() => {
      view = TestRenderer.create(
        <NativesmartProvider>
          <Input placeholder="Phone number" />
        </NativesmartProvider>
      );
    });

    expect(view.root.findByType("TextInput").props.placeholder).toBe("Phone number");
  });

  it("adds an accessibility hint when invalid", () => {
    let view!: TestRenderer.ReactTestRenderer;

    act(() => {
      view = TestRenderer.create(
        <NativesmartProvider>
          <Input placeholder="Amount" invalid />
        </NativesmartProvider>
      );
    });

    expect(view.root.findByType("TextInput").props.accessibilityHint).toBe(
      "Input value is invalid"
    );
  });
});
