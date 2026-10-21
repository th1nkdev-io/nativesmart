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
  typeName
} from "./shared";

const swiftWeights: Record<number, string> = {
  300: ".light",
  400: ".regular",
  500: ".medium",
  600: ".semibold",
  700: ".bold",
  800: ".heavy",
  900: ".black"
};

function hex(color: string) {
  return `Color(nsHex: 0x${color.slice(1).toUpperCase()})`;
}

function number(value: number) {
  return Number.isInteger(value) ? `${value}` : `${value}`;
}

/** SwiftUI source: color themes per brand, an environment value and every shared scale. */
export function toSwift() {
  const shapeKeys = Object.keys(brands[0].shape);
  const fontKeys = Object.keys(brands[0].typography.fontFamily);
  const lines: string[] = [
    `// ${header}`,
    "import SwiftUI",
    "",
    "public extension Color {",
    "  /// A color from a 0xRRGGBB value.",
    "  init(nsHex hex: UInt32) {",
    "    self.init(",
    "      .sRGB,",
    "      red: Double((hex >> 16) & 0xFF) / 255,",
    "      green: Double((hex >> 8) & 0xFF) / 255,",
    "      blue: Double(hex & 0xFF) / 255,",
    "      opacity: 1",
    "    )",
    "  }",
    "}",
    "",
    "public struct NsColors: Equatable {",
    ...colorRoles.map((role) => `  public let ${role}: Color`),
    "}",
    "",
    "public struct NsShape: Equatable {",
    ...shapeKeys.map((key) => `  public let ${key}: CGFloat`),
    "}",
    "",
    "public struct NsFonts: Equatable {",
    ...fontKeys.map((key) => `  public let ${key}: String`),
    "}",
    "",
    "public struct NsTheme: Equatable {",
    "  public let colors: NsColors",
    "  public let shape: NsShape",
    "  public let fonts: NsFonts",
    "}",
    "",
    "public enum NsBrands {"
  ];

  for (const brand of brands) {
    lines.push(`  public enum ${typeName(brand.id)} {`);
    const shape = shapeValues(brand);
    for (const variant of themeVariants(brand)) {
      lines.push(`    public static let ${variant.name} = NsTheme(`);
      lines.push("      colors: NsColors(");
      lines.push(
        colorRoles.map((role) => `        ${role}: ${hex(variant.colors[role])}`).join(",\n")
      );
      lines.push("      ),");
      lines.push(
        `      shape: NsShape(${shapeKeys.map((key) => `${key}: ${shape[key] === 999 ? 9999 : shape[key]}`).join(", ")}),`
      );
      lines.push(
        `      fonts: NsFonts(${fontKeys
          .map(
            (key) =>
              `${key}: ${JSON.stringify(brand.typography.fontFamily[key as keyof typeof brand.typography.fontFamily][0])}`
          )
          .join(", ")})`
      );
      lines.push("    )");
    }
    lines.push("  }");
  }
  lines.push(
    "}",
    "",
    "private struct NsThemeKey: EnvironmentKey {",
    `  static let defaultValue = NsBrands.${typeName(brands[0].id)}.light`,
    "}",
    "",
    "public extension EnvironmentValues {",
    "  /// Read with `@Environment(\\.nsTheme) var theme`, set with `.environment(\\.nsTheme, ...)`.",
    "  var nsTheme: NsTheme {",
    "    get { self[NsThemeKey.self] }",
    "    set { self[NsThemeKey.self] = newValue }",
    "  }",
    "}",
    "",
    "public struct NsTextStyle: Equatable {",
    "  public let size: CGFloat",
    "  public let lineHeight: CGFloat",
    "  public let weight: Font.Weight",
    "  /// Letter spacing relative to the size, in em.",
    "  public let tracking: CGFloat",
    "  /// Brand font role: sans, heading, display, serif or mono.",
    "  public let family: String",
    "  public let italic: Bool",
    "}",
    "",
    "public enum NsTokens {"
  );

  for (const scale of nativeScales) {
    const type = scale.unit === "duration" ? "TimeInterval" : "CGFloat";
    lines.push(`  public enum ${scale.name} {`);
    for (const [key, value] of Object.entries(scale.values)) {
      const written = scale.unit === "duration" ? value / 1000 : key === "full" ? 9999 : value;
      lines.push(
        `    public static let ${identifier(key, scale.prefix)}: ${type} = ${number(written)}`
      );
    }
    lines.push("  }");
  }

  lines.push("  public enum FontWeight {");
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`    public static let ${key}: Font.Weight = ${swiftWeights[value]}`);
  }
  lines.push("  }", "  public enum Easing {");
  for (const [key, value] of Object.entries(primitives.motion.easing)) {
    const [x1, y1, x2, y2] = bezier(value);
    lines.push(
      `    public static func ${key}(duration: TimeInterval) -> Animation { .timingCurve(${x1}, ${y1}, ${x2}, ${y2}, duration: duration) }`
    );
  }
  lines.push("  }", "  public enum Spring {");
  for (const [key, spring] of Object.entries(primitives.motion.spring)) {
    lines.push(
      `    /// Damping ratio ${dampingRatio(spring)}.`,
      `    public static let ${key} = Animation.interpolatingSpring(mass: ${spring.mass}, stiffness: ${spring.stiffness}, damping: ${spring.damping})`
    );
  }
  lines.push("  }", "  public enum TextStyle {");
  for (const style of nativeTextStyles) {
    lines.push(
      `    public static let ${style.name} = NsTextStyle(size: ${style.size}, lineHeight: ${style.lineHeight}, weight: ${swiftWeights[style.weight]}, tracking: ${style.tracking}, family: "${style.family}", italic: ${style.italic})`
    );
  }
  lines.push("  }", "}", "");
  return lines.join("\n");
}
