import type { BrandTheme } from "../brands";
import { primitives } from "../primitives";
import {
  bezier,
  brands,
  colorRoles,
  dampingRatio,
  fontWeights,
  header,
  identifier,
  nativeScales,
  nativeTextStyles,
  shapeValues,
  themeVariants,
  typeName,
  type NativeThemeVariant
} from "./shared";

/** A token key as a C# member name: `4` becomes `S4`, `2xl` becomes `Xl2`, `onPrimary` `OnPrimary`. */
export function pascal(key: string | number, numericPrefix = "s") {
  const name = identifier(key, numericPrefix);
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}

function color(value: string) {
  return `Color.FromArgb("#FF${value.slice(1).toUpperCase()}")`;
}

function double(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value}`;
}

/**
 * .NET MAUI source: a theme record per brand and mode, and every shared scale as static classes.
 * Values are device-independent units, the unit MAUI uses everywhere.
 */
export function toCSharp(namespace = "NativeSmart.Tokens") {
  const shapeKeys = Object.keys(brands[0].shape);
  const fontKeys = Object.keys(brands[0].typography.fontFamily);
  const lines: string[] = [
    `// ${header}`,
    "using Microsoft.Maui.Graphics;",
    "",
    `namespace ${namespace};`,
    "",
    "public sealed record NsColors(",
    colorRoles.map((role) => `  Color ${pascal(role)}`).join(",\n"),
    ");",
    "",
    `public sealed record NsShape(${shapeKeys.map((key) => `double ${pascal(key)}`).join(", ")});`,
    "",
    `public sealed record NsFonts(${fontKeys.map((key) => `string ${pascal(key)}`).join(", ")});`,
    "",
    "public sealed record NsTheme(NsColors Colors, NsShape Shape, NsFonts Fonts);",
    "",
    "/// <summary>Size and line height in device-independent units, tracking in em.</summary>",
    "public sealed record NsTextStyle(double Size, double LineHeight, int Weight, double Tracking, string Family, bool Italic);",
    "",
    "/// <summary>A cubic Bézier easing, usable with <c>new Easing(t => curve.Evaluate(t))</c>.</summary>",
    "public sealed record NsCurve(double X1, double Y1, double X2, double Y2)",
    "{",
    "  public double Evaluate(double t)",
    "  {",
    "    double low = 0, high = 1, x = t;",
    "    for (var i = 0; i < 20; i++)",
    "    {",
    "      x = (low + high) / 2;",
    "      var value = 3 * X1 * x * (1 - x) * (1 - x) + 3 * X2 * x * x * (1 - x) + x * x * x;",
    "      if (value < t) low = x; else high = x;",
    "    }",
    "    return 3 * Y1 * x * (1 - x) * (1 - x) + 3 * Y2 * x * x * (1 - x) + x * x * x;",
    "  }",
    "}",
    "",
    "public sealed record NsSpring(double Mass, double Stiffness, double Damping, double DampingRatio);",
    "",
    "public static class NsBrands",
    "{"
  ];

  for (const brand of brands) {
    lines.push(`  public static class ${typeName(brand.id)}`, "  {");
    const shape = shapeValues(brand);
    for (const variant of themeVariants(brand)) {
      lines.push(`    public static readonly NsTheme ${pascal(variant.name)} = new(`);
      lines.push("      new NsColors(");
      lines.push(colorRoles.map((role) => `        ${color(variant.colors[role])}`).join(",\n"));
      lines.push("      ),");
      lines.push(
        `      new NsShape(${shapeKeys.map((key) => (shape[key] === 999 ? 9999 : shape[key])).join(", ")}),`
      );
      lines.push(
        `      new NsFonts(${fontKeys
          .map((key) =>
            JSON.stringify(
              brand.typography.fontFamily[key as keyof typeof brand.typography.fontFamily][0]
            )
          )
          .join(", ")})`
      );
      lines.push("    );");
    }
    lines.push("  }");
  }
  lines.push("}", "", "public static class NsTokens", "{");

  for (const scale of nativeScales) {
    lines.push(`  public static class ${scale.name}`, "  {");
    for (const [key, value] of Object.entries(scale.values)) {
      const type = scale.unit === "duration" ? "uint" : "double";
      const written = key === "full" ? 9999 : value;
      lines.push(`    public const ${type} ${pascal(key, scale.prefix)} = ${double(written)};`);
    }
    lines.push("  }");
  }

  lines.push("  public static class FontWeight", "  {");
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`    public const int ${pascal(key)} = ${value};`);
  }
  lines.push("  }", "  public static class Easing", "  {");
  for (const [key, value] of Object.entries(primitives.motion.easing)) {
    const [x1, y1, x2, y2] = bezier(value);
    lines.push(
      `    public static readonly NsCurve ${pascal(key)} = new(${x1}, ${y1}, ${x2}, ${y2});`
    );
  }
  lines.push("  }", "  public static class Spring", "  {");
  for (const [key, spring] of Object.entries(primitives.motion.spring)) {
    lines.push(
      `    public static readonly NsSpring ${pascal(key)} = new(${spring.mass}, ${spring.stiffness}, ${spring.damping}, ${dampingRatio(spring)});`
    );
  }
  lines.push("  }", "  public static class TextStyle", "  {");
  for (const style of nativeTextStyles) {
    lines.push(
      `    public static readonly NsTextStyle ${pascal(style.name)} = new(${style.size}, ${style.lineHeight}, ${style.weight}, ${style.tracking}, "${style.family}", ${style.italic ? "true" : "false"});`
    );
  }
  lines.push("  }", "}", "");
  return lines.join("\n");
}

/**
 * A XAML resource dictionary for one brand and mode: colors, shape, fonts and scales, read with
 * `{DynamicResource ColorPrimary}` so the theme can be swapped at runtime.
 */
export function toXaml(theme: BrandTheme, variant: NativeThemeVariant["name"] = "light") {
  const colors = themeVariants(theme).find((item) => item.name === variant)!.colors;
  const shape = shapeValues(theme);
  const lines = [
    `<?xml version="1.0" encoding="UTF-8" ?>`,
    `<!-- ${header} -->`,
    `<ResourceDictionary xmlns="http://schemas.microsoft.com/dotnet/2021/maui"`,
    `                    xmlns:x="http://schemas.microsoft.com/winfx/2009/xaml">`,
    ...colorRoles.map(
      (role) => `  <Color x:Key="Color${pascal(role)}">${colors[role].toUpperCase()}</Color>`
    ),
    ...Object.entries(shape).map(
      ([key, value]) =>
        `  <x:Double x:Key="Radius${pascal(key)}">${value === 999 ? 9999 : value}</x:Double>`
    ),
    ...Object.entries(theme.typography.fontFamily).map(
      ([key, value]) => `  <x:String x:Key="Font${pascal(key)}">${value[0]}</x:String>`
    )
  ];
  for (const scale of nativeScales) {
    if (scale.unit === "duration") continue;
    for (const [key, value] of Object.entries(scale.values)) {
      lines.push(
        `  <x:Double x:Key="${scale.name}${pascal(key, scale.prefix)}">${key === "full" ? 9999 : value}</x:Double>`
      );
    }
  }
  lines.push("</ResourceDictionary>", "");
  return lines.join("\n");
}
