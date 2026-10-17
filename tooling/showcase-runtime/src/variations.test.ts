import { getComponentContract } from "@nativesmart/contracts";
import { describe, expect, it } from "vitest";
import { requestFromSearch, requestToSearch, type RenderRequest } from "./protocol";
import { defaultProps, variationsFor } from "./variations";

const button = getComponentContract("button")!;

describe("variations", () => {
  it("starts from contract defaults and labels the component", () => {
    expect(defaultProps(button)).toMatchObject({
      label: "Button",
      variant: "solid",
      intent: "primary",
      size: "md",
      loading: false
    });
  });

  it("lists every enum value and every boolean state", () => {
    const groups = variationsFor(button);
    expect(groups.map((group) => group.title)).toEqual(["variant", "intent", "size", "states"]);
    expect(groups[0].items.map((item) => item.label)).toEqual([
      "solid",
      "outline",
      "ghost",
      "link"
    ]);
    expect(groups[3].items.map((item) => item.label)).toEqual(["default", "loading", "disabled"]);
  });
});

describe("protocol", () => {
  it("round-trips a request through the query string", () => {
    const request: RenderRequest = {
      component: "badge",
      view: "variations",
      props: { label: "New", intent: "success" },
      brand: "cv-action",
      mode: "dark",
      dir: "rtl"
    };
    expect(requestFromSearch(requestToSearch(request))).toEqual(request);
  });
});
