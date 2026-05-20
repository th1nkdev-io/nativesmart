import { primitives } from "./tokens";
import { themes } from "./themes";

const hexColorPattern = /^#([0-9a-f]{6})$/i;

function walkColors(value: unknown, path: string, errors: string[]) {
  if (typeof value === "string") {
    if (value !== "transparent" && !hexColorPattern.test(value)) {
      errors.push(`${path} must be a 6-digit hex color or transparent`);
    }
    return;
  }

  if (typeof value === "object" && value !== null) {
    for (const [key, next] of Object.entries(value)) {
      walkColors(next, `${path}.${key}`, errors);
    }
  }
}

export function validateTokens() {
  const errors: string[] = [];
  walkColors(primitives.colors, "primitives.colors", errors);
  walkColors(themes.light.colors, "themes.light.colors", errors);
  walkColors(themes.dark.colors, "themes.dark.colors", errors);

  for (const [key, value] of Object.entries(primitives.spacing)) {
    if (value < 0) errors.push(`primitives.spacing.${key} must be positive`);
  }

  if (errors.length > 0) {
    throw new Error(`Invalid Nativesmart tokens:\n${errors.join("\n")}`);
  }
}
