import { brandThemes, type BrandTheme } from "./brands";
import { colorSteps, primitives } from "./primitives";
import { contrastPairs, contrastRatio } from "./semantic/contrast";
import { semanticColorRoles } from "./semantic/roles";

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

export type ContrastResult = {
  mode: "light" | "dark";
  foreground: string;
  background: string;
  ratio: number;
  minimum: number;
  usage: string;
  /** Reason of a documented exception, when the pair is accepted below its minimum. */
  exception?: string;
};

/** Checks every required contrast pair of a brand theme in both modes. */
export function checkContrast(theme: BrandTheme): ContrastResult[] {
  return (["light", "dark"] as const).flatMap((mode) =>
    contrastPairs.map((pair) => {
      const colors = theme.colors[mode];
      const exception = theme.contrastExceptions?.find(
        (item) =>
          item.mode === mode &&
          item.foreground === pair.foreground &&
          item.background === pair.background
      );
      return {
        mode,
        foreground: pair.foreground,
        background: pair.background,
        ratio: contrastRatio(colors[pair.foreground], colors[pair.background]),
        minimum: pair.minimum,
        usage: pair.usage,
        exception: exception?.reason
      };
    })
  );
}

export function validateTokens() {
  const errors: string[] = [];
  walkColors(primitives.colors, "primitives.colors", errors);

  for (const [id, theme] of Object.entries(brandThemes) as [string, BrandTheme][]) {
    const path = `brandThemes.${id}`;
    if (theme.id !== id) errors.push(`${path} must have id "${id}"`);

    for (const [name, scale] of Object.entries(theme.palette)) {
      walkColors(scale, `${path}.palette.${name}`, errors);
      for (const step of colorSteps) {
        if (!scale[step]) errors.push(`${path}.palette.${name} is missing step ${step}`);
      }
    }

    for (const mode of ["light", "dark"] as const) {
      const colors: Record<string, string> = theme.colors[mode];
      const colorPath = `${path}.colors.${mode}`;
      walkColors(colors, colorPath, errors);

      for (const role of semanticColorRoles) {
        if (!colors[role]) errors.push(`${colorPath} is missing the "${role}" role`);
      }
      for (const key of Object.keys(colors)) {
        if (!(semanticColorRoles as readonly string[]).includes(key)) {
          errors.push(`${colorPath}.${key} is not a semantic color role`);
        }
      }
    }

    for (const [usage, key] of Object.entries(theme.shape)) {
      if (!(key in primitives.radius))
        errors.push(`${path}.shape.${usage} uses unknown radius ${key}`);
    }

    for (const [key, stack] of Object.entries(theme.typography.fontFamily)) {
      if (stack.length === 0) errors.push(`${path}.typography.fontFamily.${key} is empty`);
    }

    for (const mode of ["light", "dark"] as const) {
      const { surface, background } = theme.colors[mode];
      theme.dataviz[mode].categorical.forEach((color, index) => {
        for (const base of [surface, background]) {
          const ratio = contrastRatio(color, base);
          if (ratio < 3) {
            errors.push(
              `${path} ${mode}: chart series ${index + 1} is ${ratio.toFixed(2)}:1, below 3:1`
            );
          }
        }
      });
      theme.avatars[mode].forEach((pair, index) => {
        const ratio = contrastRatio(pair.foreground, pair.background);
        if (ratio < 4.5) {
          errors.push(`${path} ${mode}: avatar ${index + 1} is ${ratio.toFixed(2)}:1, below 4.5:1`);
        }
      });
    }

    for (const result of checkContrast(theme)) {
      if (result.ratio < result.minimum && !result.exception) {
        errors.push(
          `${path} ${result.mode}: ${result.foreground} on ${result.background} is ` +
            `${result.ratio.toFixed(2)}:1, below ${result.minimum}:1 (${result.usage})`
        );
      }
    }
  }

  for (const [key, value] of Object.entries(primitives.spacing)) {
    if (value < 0) errors.push(`primitives.spacing.${key} must be positive`);
  }

  if (errors.length > 0) {
    throw new Error(`Invalid Nativesmart tokens:\n${errors.join("\n")}`);
  }
}
