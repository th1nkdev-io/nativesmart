import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsImage from "./NsImage.vue";

const lagoon = { src: "lagoon.jpg", alt: "Lagune bordée de palmiers" };

describe("NsImage", () => {
  it("frames the image at the ratio and shows a placeholder while loading", () => {
    const wrapper = mount(NsImage, { props: { ...lagoon, ratio: "4/3" } });
    expect(wrapper.attributes("style")).toContain("--ns-image-ratio: 4 / 3");
    expect(wrapper.classes()).toContain("ns-image--loading");
    expect(wrapper.find(".ns-image__placeholder").exists()).toBe(true);
    expect(wrapper.find("img").attributes("alt")).toBe(lagoon.alt);
  });

  it("becomes a figure with its caption", () => {
    const wrapper = mount(NsImage, { props: { ...lagoon, caption: "Assinie" } });
    expect(wrapper.element.tagName).toBe("FIGURE");
    expect(wrapper.find("figcaption").text()).toBe("Assinie");
  });

  it("tries the fallback source, then shows the alt text", async () => {
    const wrapper = mount(NsImage, { props: { ...lagoon, fallbackSrc: "backup.jpg" } });
    await wrapper.find(".ns-image__img").trigger("error");
    expect(wrapper.find(".ns-image__img").attributes("src")).toBe("backup.jpg");
    await wrapper.find(".ns-image__img").trigger("error");
    const fallback = wrapper.find(".ns-image__fallback");
    expect(fallback.attributes("role")).toBe("img");
    expect(fallback.attributes("aria-label")).toBe(lagoon.alt);
    expect(wrapper.emitted("error")).toHaveLength(1);
  });

  it("names the preview trigger after the image", async () => {
    const wrapper = mount(NsImage, { props: { ...lagoon, preview: true } });
    await wrapper.find(".ns-image__img").trigger("load");
    expect(wrapper.find(".ns-image__trigger").attributes("aria-label")).toBe(
      `Enlarge image : ${lagoon.alt}`
    );
    expect(wrapper.find("dialog").exists()).toBe(true);
  });

  it("empties the alt of a decorative image", () => {
    const wrapper = mount(NsImage, { props: { ...lagoon, decorative: true } });
    expect(wrapper.find("img").attributes("alt")).toBe("");
    expect(wrapper.find("img").attributes("aria-hidden")).toBe("true");
  });
});
