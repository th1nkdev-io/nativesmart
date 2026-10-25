import type { ComponentContract, EventDoc } from "./types";

/*
 * Standard meanings, used when a contract does not explain a part, state, event or key itself.
 * A contract's own `docs` always wins: these only fill the gaps so every page says something true.
 */
const standardAnatomy: Readonly<Record<string, string>> = {
  root: "Outer element: carries layout, spacing and the component tokens",
  label: "Visible name of the control, linked to it for assistive tech",
  description: "Help text under the control, announced with it",
  error: "Validation message, shown while the value is invalid",
  control: "The interactive element itself",
  input: "Native text field that receives the value",
  trigger: "Element that opens or toggles the component",
  placeholder: "Stand-in shown while the content loads",
  fallback: "Replacement shown when the content cannot load",
  icon: "Pictogram that reinforces the meaning",
  "leading-icon": "Icon before the content",
  "trailing-icon": "Icon after the content",
  leading: "Slot before the content: icon, prefix, avatar",
  trailing: "Slot after the content: icon, suffix, action",
  counter: "Characters used against the limit",
  indicator: "Visual mark of the current state",
  listbox: "Popup list of options",
  option: "One choice in the list",
  actions: "Buttons that act on the component",
  "close-trigger": "Button that dismisses the component",
  content: "Main content area",
  header: "Top area: title and context",
  footer: "Bottom area: actions or secondary information",
  title: "Heading that names the component for assistive tech",
  message: "Main text",
  action: "Optional button tied to the message",
  backdrop: "Layer that dims and blocks the page behind",
  container: "Panel that holds the content",
  image: "Picture element",
  media: "Image, video or any visual content",
  overlay: "Layer laid over the content",
  caption: "Text that describes the content",
  spinner: "Indeterminate progress indicator",
  "loading-indicator": "Shown while an action is pending",
  "required-indicator": "Mark of a mandatory field",
  "clear-trigger": "Button that empties the value",
  separator: "Visual division between items",
  value: "Current value as displayed",
  empty: "Shown when there is nothing to display",
  loading: "Shown while data loads",
  items: "Repeated entries",
  track: "Rail the thumb moves along",
  thumb: "Draggable handle"
};

const standardStates: Readonly<Record<string, string>> = {
  default: "Resting state, no interaction in progress",
  hovered: "A pointer is over the component",
  focused: "Keyboard focus is on the component; the focus ring shows",
  pressed: "Being pressed by pointer, touch or keyboard",
  disabled: "Unavailable: no interaction, dimmed, skipped by focus where the platform allows",
  readonly: "Value can be read and copied but not changed",
  invalid: "Value fails validation; the error message is shown and announced",
  loading: "Waiting for data or an action to finish",
  loaded: "Content has finished loading",
  error: "Content or an action failed",
  open: "Visible and interactive",
  closed: "Hidden",
  opening: "Entering animation in progress",
  closing: "Exit animation in progress",
  entering: "Appearing on screen",
  visible: "Fully shown",
  exiting: "Leaving the screen",
  checked: "Option is on",
  unchecked: "Option is off",
  indeterminate: "Partly on: some nested options are checked",
  on: "Switched on",
  off: "Switched off",
  idle: "Ready, nothing in progress",
  success: "Action completed",
  dragging: "Being dragged",
  filled: "Holds a value",
  revealed: "Hidden content is shown",
  uploading: "Files are being sent",
  submitting: "The form was sent and waits for an answer"
};

const standardEvents: Readonly<Record<string, EventDoc>> = {
  press: {
    description: "Activated by click, tap, Enter or Space",
    payload: "pointer or keyboard event"
  },
  change: { description: "The value changed, on every edit", payload: "new value" },
  focus: { description: "Received keyboard or programmatic focus", payload: "focus event" },
  blur: { description: "Lost focus", payload: "focus event" },
  submit: {
    description: "The user confirmed the value, with Enter or a submit action",
    payload: "value"
  },
  dismiss: { description: "The user asked to close: close button, Escape or outside press" },
  "open-change": {
    description: "Asks the parent to open or close; the parent owns the open state",
    payload: "boolean"
  },
  action: { description: "The optional action button was pressed" },
  load: { description: "Content finished loading", payload: "load event" },
  error: { description: "Content failed to load", payload: "error event" },
  clear: { description: "The value was emptied by the clear button" },
  search: { description: "A search was requested", payload: "query" },
  "visibility-change": { description: "Content was shown or hidden", payload: "boolean" },
  complete: { description: "Every step or character was filled", payload: "value" },
  remove: { description: "An item was removed", payload: "item" },
  retry: { description: "The user asked to try again" },
  reset: { description: "The value went back to its initial state" },
  "input-change": {
    description: "The typed text changed, before any option is chosen",
    payload: "text"
  },
  reject: {
    description: "Files were refused: wrong type, too large or too many",
    payload: "files and reasons"
  },
  invalid: { description: "Submission was blocked by validation errors", payload: "errors" }
};

const standardKeys: Readonly<Record<string, string>> = {
  Tab: "Moves focus to the next focusable element; Shift + Tab goes back",
  Enter: "Activates or confirms",
  Space: "Activates or toggles",
  Escape: "Closes or cancels",
  ArrowDown: "Moves to the next item",
  ArrowUp: "Moves to the previous item",
  ArrowLeft: "Moves backward, or forward in right-to-left layouts",
  ArrowRight: "Moves forward, or backward in right-to-left layouts",
  Home: "Moves to the first item",
  End: "Moves to the last item",
  PageUp: "Moves up by a page",
  PageDown: "Moves down by a page",
  Backspace: "Deletes before the caret",
  Delete: "Deletes after the caret"
};

export type DescribedItem = { name: string; description: string; standard: boolean };
export type DescribedEvent = DescribedItem & { payload?: string };

export type ContractDescription = {
  anatomy: DescribedItem[];
  states: DescribedItem[];
  events: DescribedEvent[];
  keyboard: DescribedItem[];
  tokens: DescribedItem[];
};

function describe(
  names: readonly string[],
  own: Readonly<Record<string, string>> | undefined,
  standard: Readonly<Record<string, string>>
): DescribedItem[] {
  return names.map((name) => ({
    name,
    description: own?.[name] ?? standard[name] ?? "",
    standard: own?.[name] === undefined
  }));
}

/** Every part, state, event, key and token of a contract with what it means. */
export function describeContract(contract: ComponentContract): ContractDescription {
  const docs = contract.docs ?? {};
  return {
    anatomy: describe(contract.anatomy, docs.anatomy, standardAnatomy),
    states: describe(contract.states, docs.states, standardStates),
    events: contract.events.map((name) => {
      const event = docs.events?.[name] ?? standardEvents[name];
      return {
        name,
        description: event?.description ?? "",
        payload: event?.payload,
        standard: docs.events?.[name] === undefined
      };
    }),
    keyboard: describe(contract.accessibility.keyboard ?? [], docs.keyboard, standardKeys),
    tokens: describe(contract.semanticTokens, docs.tokens, {})
  };
}
