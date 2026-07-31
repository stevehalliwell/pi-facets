import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@earendil-works/pi-coding-agent";

type PackageManifest = {
  pi: { extensions: string[]; skills: string[]; prompts: string[] };
};

type PiSettings = { packages: string[] };

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

describe("local Pi package setup", () => {
  it("declares package resources", async () => {
    const manifest = await readJson<PackageManifest>(resolve("package.json"));

    expect(manifest.pi.extensions).toEqual(["./extensions"]);
    expect(manifest.pi.skills).toEqual(["./skills"]);
    expect(manifest.pi.prompts).toEqual(["./prompts"]);
  });

  it("loads this repository through project Pi settings", async () => {
    const settings = await readJson<PiSettings>(resolve(".pi/settings.json"));

    expect(settings.packages).toContain("..");
  });

  it("ships agreed facet, preset, prompt, and grid resources", async () => {
    const resources = [
      "facets/roles/marketing-strategist.md",
      "facets/roles/researcher.md",
      "facets/roles/delivery-lead.md",
      "facets/style/exploratory.md",
      "facets/style/explanatory.md",
      "facets/style/structured.md",
      "facets/presets/implementation-review.md",
      "facets/presets/backlog-refinement.md",
      "facets/presets/messaging-strategy.md",
      "facets/presets/research-exploration.md",
      "facets/presets/delivery-planning.md",
      "docs/facet-grid.md",
    ];

    for (const resource of resources) {
      await expect(access(resolve(resource))).resolves.toBeUndefined();
    }
  });

  it("defines argument-aware prompt templates", async () => {
    for (const name of ["explore-options", "decision-brief"]) {
      const parsed = parseFrontmatter<Record<string, unknown>>(
        await readFile(resolve("prompts", `${name}.md`), "utf8"),
      );
      expect(parsed.frontmatter.description).toEqual(expect.any(String));
      expect(parsed.frontmatter["argument-hint"]).toBe("<topic>");
      expect(parsed.body).toContain("$1");
    }
  });
});
