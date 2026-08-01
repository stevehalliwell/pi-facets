import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@earendil-works/pi-coding-agent";

type PackageManifest = {
  pi: { extensions: string[] };
};

type PiSettings = { packages: string[] };

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

describe("local Pi package setup", () => {
  it("declares package resources", async () => {
    const manifest = await readJson<PackageManifest>(resolve("package.json"));

    expect(manifest.pi.extensions).toEqual(["./extensions"]);
    expect(manifest.pi).not.toHaveProperty("skills");
    expect(manifest.pi).not.toHaveProperty("prompts");
  });

  it("loads this repository through project Pi settings", async () => {
    const settings = await readJson<PiSettings>(resolve(".pi/settings.json"));

    expect(settings.packages).toContain("..");
  });

  it("ships agreed facet, preset, prompt, and grid resources", async () => {
    const resources = [
      ".pi/skills/backlog-refinement/SKILL.md",
      ".pi/skills/competitor-analysis/SKILL.md",
      ".pi/skills/facet-alignment/SKILL.md",
      ".pi/skills/implementation/SKILL.md",
      ".pi/skills/technical-review/SKILL.md",
      ".pi/skills/website-messaging/SKILL.md",
      ".pi/facets/roles/marketing-strategist.md",
      ".pi/facets/roles/researcher.md",
      ".pi/facets/roles/delivery-lead.md",
      ".pi/facets/roles/web-platform-specialist.md",
      ".pi/facets/style/exploratory.md",
      ".pi/facets/style/explanatory.md",
      ".pi/facets/style/structured.md",
      ".pi/facets/presets/technical-review.md",
      ".pi/facets/presets/implementation-partner.md",
      ".pi/facets/presets/web-implementation.md",
      ".pi/facets/presets/backlog-refinement.md",
      ".pi/facets/presets/messaging-strategy.md",
      ".pi/facets/presets/research-exploration.md",
      ".pi/facets/presets/delivery-planning.md",
      "docs/facet-grid.md",
    ];

    for (const resource of resources) {
      await expect(access(resolve(resource))).resolves.toBeUndefined();
    }
    await expect(access(resolve(".pi/facets/presets/implementation-review.md"))).rejects.toThrow();
  });

  it("defines implementation-partner composition", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve(".pi/facets/presets/implementation-partner.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "implementation-partner",
      role: "dev-peer",
      authority: "recommend-and-proceed",
      style: "concise",
    });
  });

  it("defines web-implementation composition", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve(".pi/facets/presets/web-implementation.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "web-implementation",
      role: "web-platform-specialist",
      authority: "recommend-and-proceed",
      style: "concise",
    });
  });

  it("defines backlog-refinement composition", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve(".pi/facets/presets/backlog-refinement.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "backlog-refinement",
      role: "product-owner",
      authority: "advisory",
      style: "exploratory",
    });
  });

  it("defines argument-aware prompt templates", async () => {
    for (const name of ["explore-options", "decision-brief"]) {
      const parsed = parseFrontmatter<Record<string, unknown>>(
        await readFile(resolve(".pi", "prompts", `${name}.md`), "utf8"),
      );
      expect(parsed.frontmatter.description).toEqual(expect.any(String));
      expect(parsed.frontmatter["argument-hint"]).toBe("<topic>");
      expect(parsed.body).toContain("$1");
    }
  });
});
