import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import NsModal from "./NsModal.vue";
import NsToast from "./NsToast.vue";

describe("NsToast", () => {
  afterEach(() => vi.useRealTimers());

  it("announces politely, and danger at once", () => {
    expect(mount(NsToast, { props: { message: "Envoyé" } }).attributes("role")).toBe("status");
    expect(
      mount(NsToast, { props: { message: "Échec", intent: "danger" } }).attributes("role")
    ).toBe("alert");
  });

  it("emits action and dismiss", async () => {
    const wrapper = mount(NsToast, { props: { message: "Supprimé", actionLabel: "Annuler" } });
    await wrapper.find(".ns-toast__action").trigger("click");
    await wrapper.find(".ns-toast__close").trigger("click");
    expect(wrapper.emitted("action")).toHaveLength(1);
    expect(wrapper.emitted("dismiss")).toHaveLength(1);
  });

  it("dismisses itself after the duration, paused while hovered", async () => {
    vi.useFakeTimers();
    const wrapper = mount(NsToast, { props: { message: "Envoyé", duration: 4000 } });
    vi.advanceTimersByTime(2000);
    await wrapper.trigger("mouseenter");
    vi.advanceTimersByTime(5000);
    expect(wrapper.emitted("dismiss")).toBeUndefined();
    await wrapper.trigger("mouseleave");
    vi.advanceTimersByTime(2100);
    expect(wrapper.emitted("dismiss")).toHaveLength(1);
  });
});

describe("NsModal", () => {
  const mountModal = (props: Record<string, unknown> = {}) =>
    mount(NsModal, {
      attachTo: document.body,
      props: { open: false, title: "Confirmer l'envoi", ...props },
      slots: { default: "25 000 FCFA", actions: "<button>OK</button>" }
    });

  it("opens and closes with the open prop", async () => {
    const wrapper = mountModal();
    const dialog = wrapper.element as HTMLDialogElement;
    expect(dialog.open).toBe(false);
    await wrapper.setProps({ open: true });
    expect(dialog.open).toBe(true);
    expect(document.documentElement.classList.contains("ns-modal-open")).toBe(true);
    await wrapper.setProps({ open: false });
    expect(dialog.open).toBe(false);
    expect(document.documentElement.classList.contains("ns-modal-open")).toBe(false);
    wrapper.unmount();
  });

  it("is labelled by its title", () => {
    const wrapper = mountModal({ open: true });
    const id = wrapper.attributes("aria-labelledby")!;
    expect(wrapper.find(`#${id}`).text()).toBe("Confirmer l'envoi");
    wrapper.unmount();
  });

  it("asks to close on Escape and from the close button", async () => {
    const wrapper = mountModal({ open: true });
    await wrapper.trigger("cancel");
    await wrapper.find(".ns-modal__close").trigger("click");
    expect(wrapper.emitted("open-change")).toEqual([[false], [false]]);
    expect(wrapper.emitted("dismiss")).toHaveLength(2);
    wrapper.unmount();
  });

  it("stays open when not dismissible", async () => {
    const wrapper = mountModal({ open: true, dismissible: false });
    await wrapper.trigger("cancel");
    expect(wrapper.emitted("open-change")).toBeUndefined();
    expect(wrapper.find(".ns-modal__close").exists()).toBe(false);
    wrapper.unmount();
  });
});
