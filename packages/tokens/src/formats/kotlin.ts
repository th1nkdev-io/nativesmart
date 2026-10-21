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

function color(value: string) {
  return `Color(0xFF${value.slice(1).toUpperCase()})`;
}

function float(value: number) {
  return `${Number.isInteger(value) ? `${value}.0` : value}f`;
}

const units: Record<string, (value: number) => string> = {
  dimension: (value) => `${value}.dp`,
  font: (value) => `${value}.sp`,
  em: (value) => `${value}.em`,
  duration: (value) => `${value}`,
  number: (value) => float(value)
};

/** Jetpack Compose source: color themes per brand, a CompositionLocal and every shared scale. */
export function toKotlin(packageName = "io.nativesmart.tokens") {
  const shapeKeys = Object.keys(brands[0].shape);
  const fontKeys = Object.keys(brands[0].typography.fontFamily);
  const lines: string[] = [
    `// ${header}`,
    `package ${packageName}`,
    "",
    "import androidx.compose.animation.core.CubicBezierEasing",
    "import androidx.compose.animation.core.SpringSpec",
    "import androidx.compose.animation.core.spring",
    "import androidx.compose.runtime.Composable",
    "import androidx.compose.runtime.ReadOnlyComposable",
    "import androidx.compose.runtime.staticCompositionLocalOf",
    "import androidx.compose.ui.graphics.Color",
    "import androidx.compose.ui.text.font.FontWeight",
    "import androidx.compose.ui.unit.Dp",
    "import androidx.compose.ui.unit.TextUnit",
    "import androidx.compose.ui.unit.dp",
    "import androidx.compose.ui.unit.em",
    "import androidx.compose.ui.unit.sp",
    "",
    "data class NsColors(",
    colorRoles.map((role) => `  val ${role}: Color`).join(",\n"),
    ")",
    "",
    `data class NsShape(${shapeKeys.map((key) => `val ${key}: Dp`).join(", ")})`,
    "",
    `data class NsFonts(${fontKeys.map((key) => `val ${key}: String`).join(", ")})`,
    "",
    "data class NsThemeValues(val colors: NsColors, val shape: NsShape, val fonts: NsFonts)",
    "",
    "object NsBrands {"
  ];

  for (const brand of brands) {
    lines.push(`  object ${typeName(brand.id)} {`);
    const shape = shapeValues(brand);
    for (const variant of themeVariants(brand)) {
      lines.push(`    val ${variant.name} = NsThemeValues(`);
      lines.push("      colors = NsColors(");
      lines.push(
        colorRoles.map((role) => `        ${role} = ${color(variant.colors[role])}`).join(",\n")
      );
      lines.push("      ),");
      lines.push(
        `      shape = NsShape(${shapeKeys.map((key) => `${key} = ${shape[key] === 999 ? 9999 : shape[key]}.dp`).join(", ")}),`
      );
      lines.push(
        `      fonts = NsFonts(${fontKeys
          .map(
            (key) =>
              `${key} = ${JSON.stringify(brand.typography.fontFamily[key as keyof typeof brand.typography.fontFamily][0])}`
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
    `val LocalNsTheme = staticCompositionLocalOf { NsBrands.${typeName(brands[0].id)}.light }`,
    "",
    "/** Current theme: `NsTheme.colors.primary`. Provide another one with `LocalNsTheme`. */",
    "object NsTheme {",
    "  val colors: NsColors",
    "    @Composable @ReadOnlyComposable get() = LocalNsTheme.current.colors",
    "  val shape: NsShape",
    "    @Composable @ReadOnlyComposable get() = LocalNsTheme.current.shape",
    "  val fonts: NsFonts",
    "    @Composable @ReadOnlyComposable get() = LocalNsTheme.current.fonts",
    "}",
    "",
    "data class NsSpring(val dampingRatio: Float, val stiffness: Float) {",
    "  fun <T> spec(): SpringSpec<T> = spring(dampingRatio = dampingRatio, stiffness = stiffness)",
    "}",
    "",
    "/** Brand font role in `family`: sans, heading, display, serif or mono. */",
    "data class NsTextStyle(",
    "  val size: TextUnit,",
    "  val lineHeight: TextUnit,",
    "  val weight: FontWeight,",
    "  val tracking: TextUnit,",
    "  val family: String,",
    "  val italic: Boolean",
    ")",
    "",
    "object NsTokens {"
  );

  for (const scale of nativeScales) {
    lines.push(`  object ${scale.name} {`);
    for (const [key, value] of Object.entries(scale.values)) {
      const written = key === "full" ? 9999 : value;
      lines.push(`    val ${identifier(key, scale.prefix)} = ${units[scale.unit](written)}`);
    }
    lines.push("  }");
  }

  lines.push("  object Weight {");
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`    val ${key} = FontWeight(${value})`);
  }
  lines.push("  }", "  object Easing {");
  for (const [key, value] of Object.entries(primitives.motion.easing)) {
    const [x1, y1, x2, y2] = bezier(value);
    lines.push(`    val ${key} = CubicBezierEasing(${[x1, y1, x2, y2].map(float).join(", ")})`);
  }
  lines.push("  }", "  object Spring {");
  for (const [key, spring] of Object.entries(primitives.motion.spring)) {
    lines.push(
      `    val ${key} = NsSpring(dampingRatio = ${float(dampingRatio(spring))}, stiffness = ${float(spring.stiffness)})`
    );
  }
  lines.push("  }", "  object TextStyle {");
  for (const style of nativeTextStyles) {
    lines.push(
      `    val ${style.name} = NsTextStyle(${style.size}.sp, ${style.lineHeight}.sp, FontWeight(${style.weight}), ${style.tracking}.em, "${style.family}", ${style.italic})`
    );
  }
  lines.push("  }", "}", "");
  return lines.join("\n");
}
