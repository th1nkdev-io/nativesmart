import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
import NsLink from "./NsLink.vue";

describe("NsLink", () => {
  it("links inside the site without opening a tab", () => {
    const wrapper = mount(NsLink, { props: { href: "/conditions", text: "nos conditions" } });
    expect(wrapper.attributes("href")).toBe("/conditions");
    expect(wrapper.attributes("target")).toBeUndefined();
    expect(wrapper.find(".ns-link__external").exists()).toBe(false);
  });

  it("detects another site and says it opens a new tab", () => {
    const wrapper = mount(NsLink, {
      props: { href: "https://example.org/aide", newTabLabel: "nouvel onglet" },
      slots: { default: "Centre d'aide" }
    });
    expect(wrapper.attributes("target")).toBe("_blank");
    expect(wrapper.attributes("rel")).toBe("noopener noreferrer");
    expect(wrapper.find(".ns-link__spoken").text()).toBe("(nouvel onglet)");
  });

  it("drops the href when disabled", () => {
    const wrapper = mount(NsLink, { props: { href: "/envoyer", disabled: true, text: "Envoyer" } });
    expect(wrapper.attributes("href")).toBeUndefined();
    expect(wrapper.attributes("aria-disabled")).toBe("true");
    expect(wrapper.attributes("role")).toBe("link");
  });

  it("renders a router component and ends a standalone link with an arrow", () => {
    const RouterLink = defineComponent({
      props: { to: String },
      setup:
        (props, { slots }) =>
        () =>
          h("a", { href: props.to, "data-router": "" }, slots.default?.())
    });
    const wrapper = mount(NsLink, {
      props: { as: RouterLink, variant: "standalone", text: "Tous les transferts" },
      attrs: { to: "/transferts" }
    });
    expect(wrapper.attributes("data-router")).toBe("");
    expect(wrapper.attributes("href")).toBe("/transferts");
    expect(wrapper.find(".ns-link__arrow").exists()).toBe(true);
  });
});
