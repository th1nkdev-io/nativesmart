import { primitives } from "../primitives";
import {
  bezier,
  brands,
  colorRoles,
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

function double(value: number) {
  return Number.isInteger(value) ? `${value}.0` : `${value}`;
}

/** Flutter source: typed themes per brand, an inherited widget and every shared scale. */
export function toDart() {
  const shapeKeys = Object.keys(brands[0].shape);
  const fontKeys = Object.keys(brands[0].typography.fontFamily);
  const field = (type: string, keys: readonly string[]) =>
    keys.map((key) => `  final ${type} ${key};`).join("\n");
  const lines: string[] = [
    `// ${header}`,
    "// ignore_for_file: constant_identifier_names",
    "import 'package:flutter/animation.dart';",
    "import 'package:flutter/physics.dart';",
    "import 'package:flutter/widgets.dart';",
    "",
    "class NsColors {",
    "  const NsColors({",
    colorRoles.map((role) => `    required this.${role},`).join("\n"),
    "  });",
    field("Color", colorRoles),
    "}",
    "",
    "class NsShape {",
    `  const NsShape({${shapeKeys.map((key) => `required this.${key}`).join(", ")}});`,
    field("double", shapeKeys),
    "}",
    "",
    "class NsFonts {",
    `  const NsFonts({${fontKeys.map((key) => `required this.${key}`).join(", ")}});`,
    field("String", fontKeys),
    "}",
    "",
    "class NsThemeData {",
    "  const NsThemeData({required this.colors, required this.shape, required this.fonts});",
    "  final NsColors colors;",
    "  final NsShape shape;",
    "  final NsFonts fonts;",
    "}",
    "",
    "abstract final class NsBrands {"
  ];

  for (const brand of brands) {
    const shape = shapeValues(brand);
    for (const variant of themeVariants(brand)) {
      const name = `${identifier(brand.id)}${variant.name.charAt(0).toUpperCase()}${variant.name.slice(1)}`;
      lines.push(`  static const ${name} = NsThemeData(`);
      lines.push("    colors: NsColors(");
      lines.push(
        colorRoles.map((role) => `      ${role}: ${color(variant.colors[role])},`).join("\n")
      );
      lines.push("    ),");
      lines.push(
        `    shape: NsShape(${shapeKeys.map((key) => `${key}: ${double(shape[key] === 999 ? 9999 : shape[key])}`).join(", ")}),`
      );
      lines.push(
        `    fonts: NsFonts(${fontKeys
          .map(
            (key) =>
              `${key}: '${brand.typography.fontFamily[key as keyof typeof brand.typography.fontFamily][0]}'`
          )
          .join(", ")}),`
      );
      lines.push("  );");
    }
  }

  lines.push(
    "}",
    "",
    "/// Current theme: `NsTheme.of(context).colors.primary`.",
    "class NsTheme extends InheritedWidget {",
    "  const NsTheme({super.key, required this.data, required super.child});",
    "  final NsThemeData data;",
    "",
    "  static NsThemeData of(BuildContext context) =>",
    `      context.dependOnInheritedWidgetOfExactType<NsTheme>()?.data ?? NsBrands.${identifier(brands[0].id)}Light;`,
    "",
    "  @override",
    "  bool updateShouldNotify(NsTheme oldWidget) => data != oldWidget.data;",
    "}",
    ""
  );

  for (const scale of nativeScales) {
    lines.push(`abstract final class Ns${scale.name} {`);
    for (const [key, value] of Object.entries(scale.values)) {
      const name = identifier(key, scale.prefix);
      const written = key === "full" ? 9999 : value;
      lines.push(
        scale.unit === "duration"
          ? `  static const ${name} = Duration(milliseconds: ${written});`
          : `  static const double ${name} = ${double(written)};`
      );
    }
    lines.push("}", "");
  }

  lines.push("abstract final class NsFontWeight {");
  for (const [key, value] of Object.entries(fontWeights)) {
    lines.push(`  static const ${key} = FontWeight.w${value};`);
  }
  lines.push("}", "", "abstract final class NsEasing {");
  for (const [key, value] of Object.entries(primitives.motion.easing)) {
    lines.push(`  static const ${key} = Cubic(${bezier(value).map(double).join(", ")});`);
  }
  lines.push("}", "", "abstract final class NsSpring {");
  for (const [key, spring] of Object.entries(primitives.motion.spring)) {
    lines.push(
      `  static const ${key} = SpringDescription(mass: ${double(spring.mass)}, stiffness: ${double(spring.stiffness)}, damping: ${double(spring.damping)});`
    );
  }
  lines.push(
    "}",
    "",
    "/// Text styles without a family: apply the brand font from `NsTheme.of(context).fonts`.",
    "abstract final class NsTextStyles {"
  );
  for (const style of nativeTextStyles) {
    lines.push(
      `  static const ${style.name} = TextStyle(fontSize: ${double(style.size)}, height: ${Math.round((style.lineHeight / style.size) * 1000) / 1000}, fontWeight: FontWeight.w${style.weight}, letterSpacing: ${Math.round(style.tracking * style.size * 100) / 100}${style.italic ? ", fontStyle: FontStyle.italic" : ""});`
    );
  }
  lines.push("}", "");
  return lines.join("\n");
}
