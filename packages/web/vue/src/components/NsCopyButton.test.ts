import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import NsCopyButton from "./NsCopyButton.vue";

const account = "CI93 0001 2345 6789 4521";

function clipboard(writeText: (text: string) => Promise<void>) {
  Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });
}

afterEach(() => vi.useRealTimers());

describe("NsCopyButton", () => {
  it("shows the value in a field and names its button after the caption", () => {
    const wrapper = mount(NsCopyButton, { props: { value: account, caption: "Numéro de compte" } });
    expect(wrapper.find(".ns-copy-button__value").text()).toBe(account);
    expect(wrapper.find("button").attributes("aria-label")).toBe("Copy : Numéro de compte");
  });

  it("copies, confirms and announces, then goes back", async () => {
    vi.useFakeTimers();
    const writeText = vi.fn().mockResolvedValue(undefined);
    clipboard(writeText);
    const wrapper = mount(NsCopyButton, {
      props: { value: account, display: "button", timeout: 1000 }
    });
    await wrapper.find("button").trigger("click");
    await flushPromises();
    expect(writeText).toHaveBeenCalledWith(account);
    expect(wrapper.emitted("copy")?.[0]).toEqual([account]);
    expect(wrapper.find('[role="status"]').text()).toBe("Copied");
    expect(wrapper.find(".ns-button__label").text()).toBe("Copied");
    vi.advanceTimersByTime(1000);
    await flushPromises();
    expect(wrapper.find(".ns-button__label").text()).toBe("Copy");
  });

  it("reports a refused clipboard", async () => {
    clipboard(vi.fn().mockRejectedValue(new Error("denied")));
    Object.defineProperty(document, "execCommand", { value: () => false, configurable: true });
    const wrapper = mount(NsCopyButton, { props: { value: account, display: "icon" } });
    await wrapper.find("button").trigger("click");
    await flushPromises();
    expect(wrapper.emitted("error")).toHaveLength(1);
    expect(wrapper.find('[role="status"]').text()).toBe("Copy failed");
  });

  it("masks all but the last four characters and says so", () => {
    const wrapper = mount(NsCopyButton, { props: { value: account, mask: true } });
    expect(wrapper.find(".ns-copy-button__value [aria-hidden]").text()).toBe("•••• 4521");
    expect(wrapper.find(".ns-copy-button__value .ns-copy-button__spoken").text()).toBe(
      "hidden, ending in 4521"
    );
  });
});
