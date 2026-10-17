import { brandThemes } from "./brands";
import { semanticColorRoles } from "./semantic/roles";
import { primitives } from "./tokens";

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

  for (const [id, theme] of Object.entries(brandThemes)) {
    if (theme.id !== id) errors.push(`brandThemes.${id} must have id "${id}"`);

    for (const mode of ["light", "dark"] as const) {
      const colors: Record<string, string> = theme.colors[mode];
      const path = `brandThemes.${id}.colors.${mode}`;
      walkColors(colors, path, errors);

      for (const role of semanticColorRoles) {
        if (!colors[role]) errors.push(`${path} is missing the "${role}" role`);
      }
      for (const key of Object.keys(colors)) {
        if (!(semanticColorRoles as readonly string[]).includes(key)) {
          errors.push(`${path}.${key} is not a semantic color role`);
        }
      }
    }

    for (const [key, stack] of Object.entries(theme.typography.fontFamily)) {
      if (stack.length === 0)
        errors.push(`brandThemes.${id}.typography.fontFamily.${key} is empty`);
    }
  }

  for (const [key, value] of Object.entries(primitives.spacing)) {
    if (value < 0) errors.push(`primitives.spacing.${key} must be positive`);
  }

  if (errors.length > 0) {
    throw new Error(`Invalid Nativesmart tokens:\n${errors.join("\n")}`);
  }
}
