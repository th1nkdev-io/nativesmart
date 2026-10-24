import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { registerIcons } from "../icons";
import NsAvatar from "./NsAvatar.vue";
import NsBox from "./NsBox.vue";
import NsCard from "./NsCard.vue";
import NsDivider from "./NsDivider.vue";
import NsIcon from "./NsIcon.vue";
import NsText from "./NsText.vue";

describe("NsBox", () => {
  it("renders the requested element with spacing and background tokens", () => {
    const wrapper = mount(NsBox, {
      props: { as: "section", padding: "4", background: "surface-muted", border: true },
      slots: { default: "Content" }
    });
    expect(wrapper.element.tagName).toBe("SECTION");
    expect(wrapper.attributes("style")).toContain("--ns-box-padding: var(--ns-space-4)");
    expect(wrapper.attributes("style")).toContain("var(--ns-color-surface-muted)");
    expect(wrapper.classes()).toContain("ns-box--border");
  });
});

describe("NsDivider", () => {
  it("is a horizontal separator by default", () => {
    const wrapper = mount(NsDivider);
    expect(wrapper.attributes("role")).toBe("separator");
    expect(wrapper.attributes("aria-orientation")).toBe("horizontal");
  });

  it("can be vertical, labelled or decorative", () => {
    expect(
      mount(NsDivider, { props: { orientation: "vertical" } }).attributes("aria-orientation")
    ).toBe("vertical");
    expect(mount(NsDivider, { props: { label: "ou" } }).text()).toBe("ou");
    expect(mount(NsDivider, { props: { decorative: true } }).attributes("role")).toBe("none");
  });
});

describe("NsText", () => {
  it("maps roles to elements and text styles", () => {
    expect(mount(NsText, { slots: { default: "Body" } }).element.tagName).toBe("P");
    const heading = mount(NsText, {
      props: { role: "heading", level: 3 },
      slots: { default: "Title" }
    });
    expect(heading.element.tagName).toBe("H3");
    expect(heading.attributes("style")).toContain("var(--ns-text-h3-size)");
    expect(mount(NsText, { props: { role: "caption" } }).element.tagName).toBe("SPAN");
  });

  it("lets the element be overridden", () => {
    expect(mount(NsText, { props: { role: "label", as: "legend" } }).element.tagName).toBe(
      "LEGEND"
    );
  });
});

describe("NsIcon", () => {
  it("is decorative without a label", () => {
    const wrapper = mount(NsIcon, { props: { name: "check" } });
    expect(wrapper.attributes("aria-hidden")).toBe("true");
    expect(wrapper.find("path").exists()).toBe(true);
  });

  it("is announced with a label", () => {
    const wrapper = mount(NsIcon, { props: { name: "check", label: "Paid" } });
    expect(wrapper.attributes("role")).toBe("img");
    expect(wrapper.attributes("aria-label")).toBe("Paid");
  });

  it("uses registered icons and shows a placeholder for unknown names", () => {
    registerIcons({ brand: "M0 0h24v24H0Z" });
    expect(
      mount(NsIcon, { props: { name: "brand" } })
        .find("path")
        .attributes("d")
    ).toBe("M0 0h24v24H0Z");
    expect(mount(NsIcon, { props: { name: "nope" } }).classes()).toContain("ns-icon--missing");
  });

  it("marks sideways arrows as directional for right-to-left layouts", () => {
    expect(mount(NsIcon, { props: { name: "arrow-right" } }).attributes("data-directional")).toBe(
      "true"
    );
  });
});

describe("NsAvatar", () => {
  it("shows initials and exposes the label", () => {
    const wrapper = mount(NsAvatar, { props: { label: "Kofi Mensah" } });
    expect(wrapper.text()).toBe("KM");
    expect(wrapper.attributes("role")).toBe("img");
    expect(wrapper.attributes("aria-label")).toBe("Kofi Mensah");
  });

  it("gives the same label the same palette", () => {
    const style = (label: string) => mount(NsAvatar, { props: { label } }).attributes("style");
    expect(style("Aïcha")).toBe(style("Aïcha"));
  });

  it("falls back to initials when the image fails", async () => {
    const wrapper = mount(NsAvatar, { props: { label: "Aïcha", source: "missing.png" } });
    await wrapper.find("img").trigger("error");
    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.text()).toBe("A");
  });
});

describe("NsCard", () => {
  it("renders header, content and footer", () => {
    const wrapper = mount(NsCard, {
      props: { title: "Solde", description: "Compte principal" },
      slots: { default: "1 250 000 FCFA", footer: "<button>Envoyer</button>" }
    });
    expect(wrapper.find(".ns-card__title").text()).toBe("Solde");
    expect(wrapper.find(".ns-card__content").text()).toBe("1 250 000 FCFA");
    expect(wrapper.find(".ns-card__footer button").exists()).toBe(true);
  });

  it("omits empty parts", () => {
    const wrapper = mount(NsCard, { slots: { default: "Only content" } });
    expect(wrapper.find(".ns-card__header").exists()).toBe(false);
    expect(wrapper.find(".ns-card__footer").exists()).toBe(false);
  });
});
