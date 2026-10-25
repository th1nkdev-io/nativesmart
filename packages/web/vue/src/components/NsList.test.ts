import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsList from "./NsList.vue";

const steps = ["Créez votre compte", "Ajoutez un bénéficiaire", "Envoyez en un geste"];

describe("NsList", () => {
  it("renders an explicit list of the items", () => {
    const wrapper = mount(NsList, { props: { items: steps } });
    expect(wrapper.element.tagName).toBe("UL");
    expect(wrapper.attributes("role")).toBe("list");
    expect(wrapper.findAll("li").map((item) => item.text())).toEqual(steps);
  });

  it("orders numbers and steps from start", () => {
    const wrapper = mount(NsList, { props: { items: steps, marker: "steps", start: 3 } });
    expect(wrapper.element.tagName).toBe("OL");
    expect(wrapper.attributes("start")).toBe("3");
    expect(wrapper.attributes("style")).toContain("counter-reset: ns-list 2");
  });

  it("shows a description under the title", () => {
    const wrapper = mount(NsList, {
      props: { items: [{ title: "Kofi Mensah", description: "25 000 FCFA" }] }
    });
    expect(wrapper.find(".ns-list__description").text()).toBe("25 000 FCFA");
  });

  it("draws check and icon markers from the icon set", () => {
    const check = mount(NsList, { props: { items: steps, marker: "check" } });
    expect(check.attributes("style")).toContain('--ns-list-mask: url("data:image/svg+xml,');
    const bullet = mount(NsList, { props: { items: steps } });
    expect(bullet.attributes("style") ?? "").not.toContain("--ns-list-mask");
  });

  it("takes li elements from the slot", () => {
    const wrapper = mount(NsList, { slots: { default: "<li>Awa</li><li>Yao</li>" } });
    expect(wrapper.findAll("li")).toHaveLength(2);
  });
});
