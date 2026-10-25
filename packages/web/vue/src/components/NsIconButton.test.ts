import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsIconButton from "./NsIconButton.vue";

describe("NsIconButton", () => {
  it("is a quiet square button named by its label", () => {
    const wrapper = mount(NsIconButton, { props: { icon: "bell", label: "Notifications" } });
    const button = wrapper.find("button");
    expect(button.attributes("aria-label")).toBe("Notifications");
    expect(button.classes()).toEqual(
      expect.arrayContaining(["ns-button--icon-only", "ns-button--ghost", "ns-button--neutral"])
    );
    expect(wrapper.attributes("data-tip")).toBe("Notifications");
  });

  it("adds a badge count to the name and draws a dot for an empty badge", () => {
    const count = mount(NsIconButton, {
      props: { icon: "bell", label: "Notifications", badge: 3 }
    });
    expect(count.find("button").attributes("aria-label")).toBe("Notifications, 3");
    expect(count.find(".ns-icon-button__badge").text()).toBe("3");
    const dot = mount(NsIconButton, { props: { icon: "mail", label: "Messages", badge: "" } });
    expect(dot.find(".ns-icon-button__badge--dot").exists()).toBe(true);
    expect(dot.find("button").attributes("aria-label")).toBe("Messages");
  });

  it("maps circle to a pill and emits press", async () => {
    const wrapper = mount(NsIconButton, {
      props: { icon: "plus", label: "Ajouter", shape: "circle" }
    });
    expect(wrapper.find("button").classes()).toContain("ns-button--shape-pill");
    await wrapper.find("button").trigger("click");
    expect(wrapper.emitted("press")).toHaveLength(1);
  });
});
