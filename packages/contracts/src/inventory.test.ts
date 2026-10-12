import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { componentContracts } from "./catalog";

const categoriesBySection = [
  "layout",
  "typography",
  "actions",
  "forms",
  "feedback",
  "overlays",
  "navigation",
  "data-display",
  "media",
  "utilities",
  "identity",
  "payments",
  "connectivity",
  "commerce",
  "delivery",
  "saas",
  "public-services"
];

function readInventory() {
  const markdown = readFileSync(resolve(__dirname, "../../../docs/component-inventory.md"), "utf8");
  const rows: { id: string; category: string; priority: string }[] = [];
  let section = 0;
  for (const line of markdown.split("\n")) {
    const heading = /^### (\d+)\./.exec(line);
    if (heading) section = Number(heading[1]);
    const row = /^\| [^|]+\| `([a-z0-9-]+)` +\|.*\| (P[0-2]) +\|/.exec(line);
    if (section > 0 && row) {
      rows.push({ id: row[1]!, category: categoriesBySection[section - 1]!, priority: row[2]! });
    }
  }
  return rows;
}

describe("component inventory", () => {
  it("matches docs/component-inventory.md exactly", () => {
    const fromDocs = readInventory().sort((a, b) => a.id.localeCompare(b.id));
    const fromContracts = componentContracts
      .map(({ id, category, priority }) => ({ id, category, priority }))
      .sort((a, b) => a.id.localeCompare(b.id));
    expect(fromContracts).toEqual(fromDocs);
  });
});
