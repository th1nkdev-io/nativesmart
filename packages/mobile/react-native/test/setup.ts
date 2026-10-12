import { vi } from "vitest";

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const originalError = console.error;

vi.spyOn(console, "error").mockImplementation((message?: unknown, ...args: unknown[]) => {
  if (typeof message === "string" && message.includes("react-test-renderer is deprecated")) {
    return;
  }

  originalError(message, ...args);
});
