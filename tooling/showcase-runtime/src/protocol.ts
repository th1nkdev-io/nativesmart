import type { BrandThemeId } from "@nativesmart/tokens";

export type ShowcaseView = "playground" | "variations";
export type ShowcaseColorMode = "light" | "dark";
export type ShowcaseDirection = "ltr" | "rtl";
export type ShowcaseDensity = "compact" | "comfortable" | "spacious";
export type ShowcasePropValue = string | number | boolean | readonly string[];
export type ShowcaseProps = Readonly<Record<string, ShowcasePropValue>>;

/** What the shell asks a renderer to display. */
export type RenderRequest = {
  component: string;
  view: ShowcaseView;
  props: ShowcaseProps;
  brand: BrandThemeId;
  mode: ShowcaseColorMode;
  dir: ShowcaseDirection;
  density: ShowcaseDensity;
};

export type ShellMessage = { type: "ns:render"; request: RenderRequest };

export type RendererMessage =
  | { type: "ns:ready"; renderer: string; components: readonly string[] }
  | { type: "ns:resize"; height: number }
  | { type: "ns:event"; component: string; name: string; detail?: string };

const messageTypes = new Set(["ns:render", "ns:ready", "ns:resize", "ns:event"]);

function isMessage<T extends { type: string }>(data: unknown): data is T {
  return (
    typeof data === "object" &&
    data !== null &&
    messageTypes.has((data as { type?: unknown }).type as string)
  );
}

export const defaultRequest: RenderRequest = {
  component: "button",
  view: "playground",
  props: {},
  brand: "thinkdev",
  mode: "light",
  dir: "ltr",
  density: "comfortable"
};

/** Encodes a request in a query string so a renderer URL can be opened on its own. */
export function requestToSearch(request: RenderRequest) {
  const params = new URLSearchParams({
    component: request.component,
    view: request.view,
    brand: request.brand,
    mode: request.mode,
    dir: request.dir,
    density: request.density,
    props: JSON.stringify(request.props)
  });
  return `?${params.toString()}`;
}

export function requestFromSearch(search: string): RenderRequest {
  const params = new URLSearchParams(search);
  let props: ShowcaseProps = {};
  try {
    props = JSON.parse(params.get("props") ?? "{}") as ShowcaseProps;
  } catch {
    props = {};
  }
  return {
    component: params.get("component") ?? defaultRequest.component,
    view: params.get("view") === "variations" ? "variations" : "playground",
    brand: (params.get("brand") as BrandThemeId | null) ?? defaultRequest.brand,
    mode: params.get("mode") === "dark" ? "dark" : "light",
    dir: params.get("dir") === "rtl" ? "rtl" : "ltr",
    density:
      params.get("density") === "compact" || params.get("density") === "spacious"
        ? (params.get("density") as ShowcaseDensity)
        : "comfortable",
    props
  };
}

/** Renderer side: receives render requests from the shell. Returns an unsubscribe function. */
export function onRenderRequest(handler: (request: RenderRequest) => void) {
  const listener = (event: MessageEvent) => {
    if (isMessage<ShellMessage>(event.data) && event.data.type === "ns:render") {
      handler(event.data.request);
    }
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}

/** Renderer side: sends a message to the shell when embedded in an iframe. */
export function postToShell(message: RendererMessage) {
  if (window.parent !== window) window.parent.postMessage(message, "*");
}

/** Renderer side: reports the content height so the shell can size the iframe. */
export function reportHeight(element: HTMLElement) {
  const observer = new ResizeObserver(() => {
    postToShell({ type: "ns:resize", height: Math.ceil(element.scrollHeight) });
  });
  observer.observe(element);
  return () => observer.disconnect();
}

/** Shell side: receives messages from a renderer iframe. */
export function onRendererMessage(
  frame: () => HTMLIFrameElement | null | undefined,
  handler: (message: RendererMessage) => void
) {
  const listener = (event: MessageEvent) => {
    if (event.source !== frame()?.contentWindow) return;
    if (isMessage<RendererMessage>(event.data)) handler(event.data);
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}

/** Shell side: sends a render request to a renderer iframe. */
export function sendRenderRequest(
  frame: HTMLIFrameElement | null | undefined,
  request: RenderRequest
) {
  // A JSON copy drops framework proxies, which postMessage cannot clone.
  const message: ShellMessage = { type: "ns:render", request: JSON.parse(JSON.stringify(request)) };
  frame?.contentWindow?.postMessage(message, "*");
}
