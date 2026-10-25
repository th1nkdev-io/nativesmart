import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { registerIcons } from "../icons";
import NsAvatar from "./NsAvatar.vue";
import NsCard from "./NsCard.vue";
import NsDivider from "./NsDivider.vue";
import NsIcon from "./NsIcon.vue";
import NsText from "./NsText.vue";

describe("NsDivider", () => {
  it("is a horizontal separator by default", () => {
    const wrapper = mount(NsDivider);
    expect(wrapper.attributes("role")).toBe("separator");
    expect(wrapper.attributes("aria-orientation")).toBe("horizontal");
    expect(wrapper.classes()).toEqual(
      expect.arrayContaining(["ns-divider--solid", "ns-divider--thin", "ns-divider--tone-default"])
    );
  });

  it("can be vertical or decorative", () => {
    expect(
      mount(NsDivider, { props: { orientation: "vertical" } }).attributes("aria-orientation")
    ).toBe("vertical");
    expect(mount(NsDivider, { props: { decorative: true } }).attributes("role")).toBe("none");
  });

  it("reads a label as text and hides the lines around it", () => {
    const wrapper = mount(NsDivider, { props: { label: "ou", labelPlacement: "start" } });
    expect(wrapper.text()).toBe("ou");
    expect(wrapper.attributes("role")).toBeUndefined();
    expect(wrapper.findAll('.ns-divider__line[aria-hidden="true"]')).toHaveLength(2);
    expect(wrapper.classes()).toContain("ns-divider--label-start");
  });

  it("takes custom label content", () => {
    const wrapper = mount(NsDivider, { slots: { default: "<button>Afficher plus</button>" } });
    expect(wrapper.find(".ns-divider__label button").exists()).toBe(true);
  });

  it("applies style, weight, tone, inset and spacing", () => {
    const classes = mount(NsDivider, {
      props: {
        variant: "gradient",
        thickness: "thick",
        tone: "primary",
        inset: "start",
        spacing: "md"
      }
    }).classes();
    expect(classes).toEqual(
      expect.arrayContaining([
        "ns-divider--gradient",
        "ns-divider--thick",
        "ns-divider--tone-primary",
        "ns-divider--inset-start",
        "ns-divider--spacing-md"
      ])
    );
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
