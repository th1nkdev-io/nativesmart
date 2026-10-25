import { getComponentContract } from "@nativesmart/contracts";
import { describe, expect, it } from "vitest";
import { defaultRequest, requestFromSearch, requestToSearch, type RenderRequest } from "./protocol";
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

  it("prefers the contract example over a generic sample", () => {
    expect(defaultProps(getComponentContract("icon")!)).toMatchObject({ name: "heart" });
  });

  it("switches off the booleans that default to on", () => {
    const states = variationsFor(getComponentContract("keyboard-avoider")!).find(
      (group) => group.title === "states"
    )!;
    const enabled = states.items.find((item) => item.label === "enabled=false")!;
    expect(enabled.props.enabled).toBe(false);
  });

  it("starts from the example even when a default exists", () => {
    expect(defaultProps(getComponentContract("box")!)).toMatchObject({
      background: "surface-muted",
      align: "stretch"
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
      dir: "rtl",
      density: "compact"
    };
    expect(requestFromSearch(requestToSearch(request))).toEqual(request);
  });

  it("keeps file names and accents out of the query", () => {
    const request: RenderRequest = {
      ...defaultRequest,
      component: "image",
      props: { src: "lab/lagoon.svg", alt: "Lagune bordée de palmiers" }
    };
    const search = requestToSearch(request);
    expect(search).not.toContain(".svg");
    expect(requestFromSearch(search).props).toEqual(request.props);
    expect(requestFromSearch('?props={"label":"Ok"}').props).toEqual({ label: "Ok" });
  });
});
