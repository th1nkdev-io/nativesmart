export type NsKbdPlatform = "apple" | "other";

type KeyInfo = { apple: string; other: string; text: string; name: string };

/* Named keys: symbol on Apple keyboards, label elsewhere, word for display="text", spoken name. */
const named: Record<string, KeyInfo> = {
  mod: { apple: "⌘", other: "Ctrl", text: "Cmd", name: "Command" },
  meta: { apple: "⌘", other: "Win", text: "Cmd", name: "Command" },
  cmd: { apple: "⌘", other: "Ctrl", text: "Cmd", name: "Command" },
  ctrl: { apple: "⌃", other: "Ctrl", text: "Ctrl", name: "Control" },
  alt: { apple: "⌥", other: "Alt", text: "Alt", name: "Alt" },
  option: { apple: "⌥", other: "Alt", text: "Option", name: "Option" },
  shift: { apple: "⇧", other: "⇧", text: "Shift", name: "Shift" },
  enter: { apple: "↵", other: "↵", text: "Enter", name: "Enter" },
  escape: { apple: "Esc", other: "Esc", text: "Esc", name: "Escape" },
  tab: { apple: "⇥", other: "Tab", text: "Tab", name: "Tab" },
  backspace: { apple: "⌫", other: "⌫", text: "Backspace", name: "Backspace" },
  delete: { apple: "⌦", other: "Del", text: "Del", name: "Delete" },
  space: { apple: "Space", other: "Space", text: "Space", name: "Space" },
  up: { apple: "↑", other: "↑", text: "Up", name: "Up arrow" },
  down: { apple: "↓", other: "↓", text: "Down", name: "Down arrow" },
  left: { apple: "←", other: "←", text: "Left", name: "Left arrow" },
  right: { apple: "→", other: "→", text: "Right", name: "Right arrow" },
  capslock: { apple: "⇪", other: "Caps", text: "Caps Lock", name: "Caps Lock" }
};

const aliases: Record<string, string> = {
  control: "ctrl",
  command: "cmd",
  esc: "escape",
  return: "enter",
  del: "delete",
  arrowup: "up",
  arrowdown: "down",
  arrowleft: "left",
  arrowright: "right",
  " ": "space",
  os: "meta",
  win: "meta"
};

/** Lower-case canonical name: `Control` and `ctrl` both become `ctrl`. */
export function normalizeKey(key: string): string {
  const lower = key.trim().toLowerCase();
  return aliases[lower] ?? lower;
}

/** `mod+shift+p` is a combination; `g i` or `g then i` is a sequence. */
export function parseKeys(value: string): { keys: string[]; sequence: boolean } {
  const trimmed = value.trim();
  if (!trimmed) return { keys: [], sequence: false };
  if (trimmed.includes("+") && trimmed.length > 1) {
    return { keys: trimmed.split("+").map(normalizeKey).filter(Boolean), sequence: false };
  }
  const parts = trimmed.split(/\s+(?:then\s+)?/i).filter(Boolean);
  return { keys: parts.map(normalizeKey), sequence: parts.length > 1 };
}

export function keyLabel(key: string, platform: NsKbdPlatform, display: "symbol" | "text") {
  const info = named[key];
  if (!info) return key.length === 1 ? key.toUpperCase() : key[0]!.toUpperCase() + key.slice(1);
  if (display === "symbol") return info[platform];
  if (platform === "apple") return info.text;
  return /^[A-Za-z]/.test(info.other) ? info.other : info.text;
}

export function keyName(key: string, platform: NsKbdPlatform) {
  const info = named[key];
  if (!info) return key.length === 1 ? key.toUpperCase() : key;
  if (key === "mod" || key === "cmd") return platform === "apple" ? "Command" : "Control";
  return info.name;
}

/** Whether a held key satisfies one part of the shortcut. `mod` follows the platform. */
export function isHeld(key: string, held: ReadonlySet<string>, platform: NsKbdPlatform) {
  if (key === "mod" || key === "cmd") return held.has(platform === "apple" ? "meta" : "ctrl");
  if (key === "option") return held.has("alt");
  return held.has(key);
}

export function detectPlatform(): NsKbdPlatform {
  if (typeof navigator === "undefined") return "other";
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const name = nav.userAgentData?.platform || nav.platform || nav.userAgent;
  return /mac|iphone|ipad|ipod/i.test(name) ? "apple" : "other";
}
