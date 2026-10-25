import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsLabel from "./NsLabel.vue";

describe("NsLabel", () => {
  it("names its control and links the description", () => {
    const wrapper = mount(NsLabel, {
      props: { text: "Montant", for: "amount", description: "En FCFA" }
    });
    expect(wrapper.find("label").attributes("for")).toBe("amount");
    expect(wrapper.find(".ns-label__description").attributes("id")).toBe("amount-description");
  });

  it("marks required fields with a decorative asterisk", () => {
    const wrapper = mount(NsLabel, { props: { text: "Nom", required: true, optional: true } });
    const mark = wrapper.find(".ns-label__required");
    expect(mark.attributes("aria-hidden")).toBe("true");
    expect(wrapper.find(".ns-label__optional").exists()).toBe(false);
  });

  it("names the info button with its help and shows the counter", () => {
    const wrapper = mount(NsLabel, {
      props: { text: "Note", info: "Visible par Aïcha", counter: "12/80", optional: true }
    });
    expect(wrapper.find(".ns-label__info").attributes("aria-label")).toBe("Visible par Aïcha");
    expect(wrapper.find(".ns-label__counter").text()).toBe("12/80");
    expect(wrapper.find(".ns-label__optional").text()).toBe("(Optional)");
  });

  it("becomes the legend of a fieldset", () => {
    const wrapper = mount(NsLabel, { props: { text: "Moyen de paiement", as: "legend" } });
    expect(wrapper.element.tagName).toBe("LEGEND");
    expect(wrapper.find("label").exists()).toBe(false);
  });
});
