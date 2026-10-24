import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import NsInput from "./NsInput.vue";

describe("NsInput", () => {
  it("associates the label with the field", () => {
    const wrapper = mount(NsInput, { props: { label: "Montant" } });
    const id = wrapper.find("input").attributes("id");
    expect(wrapper.find("label").attributes("for")).toBe(id);
  });

  it("emits change and update:modelValue while typing", async () => {
    const wrapper = mount(NsInput, { props: { label: "Montant" } });
    await wrapper.find("input").setValue("25000");
    expect(wrapper.emitted("change")?.[0]).toEqual(["25000"]);
    expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["25000"]);
  });

  it("follows the controlled value", async () => {
    const wrapper = mount(NsInput, { props: { value: "a" } });
    await wrapper.setProps({ value: "b" });
    expect((wrapper.find("input").element as HTMLInputElement).value).toBe("b");
  });

  it("emits submit on Enter", async () => {
    const wrapper = mount(NsInput, { props: { value: "42" } });
    await wrapper.find("input").trigger("keydown", { key: "Enter" });
    expect(wrapper.emitted("submit")?.[0]).toEqual(["42"]);
  });

  it("describes the field with its help text and error", () => {
    const wrapper = mount(NsInput, {
      props: {
        label: "E-mail",
        description: "Pour le reçu",
        error: "Adresse invalide",
        invalid: true
      }
    });
    const input = wrapper.find("input");
    expect(input.attributes("aria-invalid")).toBe("true");
    const ids = input.attributes("aria-describedby")!.split(" ");
    expect(ids).toHaveLength(2);
    expect(wrapper.find(`#${ids[1]}`).text()).toBe("Adresse invalide");
  });

  it("hides the error while the field is valid", () => {
    const wrapper = mount(NsInput, { props: { error: "Adresse invalide" } });
    expect(wrapper.find(".ns-input__error").exists()).toBe(false);
  });

  it("is natively disabled", () => {
    const wrapper = mount(NsInput, { props: { disabled: true } });
    expect(wrapper.find("input").attributes("disabled")).toBeDefined();
  });
});
