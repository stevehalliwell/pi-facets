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
      ".pi/skills/facet-craft/SKILL.md",
      ".pi/skills/five-whys/SKILL.md",
      ".pi/skills/five-whys/references/five-whys.md",
      ".pi/skills/six-thinking-hats/SKILL.md",
      ".pi/skills/references/okf-artifacts.md",
      ".pi/skills/implementation/SKILL.md",
      ".pi/skills/web-implementation/SKILL.md",
      ".pi/skills/threejs-performance/SKILL.md",
      ".pi/skills/release-readiness/SKILL.md",
      ".pi/skills/technical-review/SKILL.md",
      ".pi/skills/website-messaging/SKILL.md",
      ".pi/skills/website-art-direction/SKILL.md",
      ".pi/facets/roles/marketing-strategist.md",
      ".pi/facets/roles/researcher.md",
      ".pi/facets/roles/inquiry-guide.md",
      ".pi/facets/roles/delivery-lead.md",
      ".pi/facets/roles/web-platform-specialist.md",
      ".pi/facets/roles/release-steward.md",
      ".pi/facets/style/exploratory.md",
      ".pi/facets/style/explanatory.md",
      ".pi/facets/style/structured.md",
      ".pi/facets/style/inquisitive.md",
      ".pi/facets/presets/technical-review.md",
      ".pi/facets/presets/five-whys.md",
      ".pi/facets/presets/implementation-partner.md",
      ".pi/facets/presets/web-implementation.md",
      ".pi/facets/presets/backlog-refinement.md",
      ".pi/facets/presets/messaging-strategy.md",
      ".pi/facets/presets/research-exploration.md",
      ".pi/facets/presets/delivery-planning.md",
      ".pi/facets/presets/release-readiness.md",
      "docs/facet-grid.md",
    ];

    for (const resource of resources) {
      await expect(access(resolve(resource))).resolves.toBeUndefined();
    }
    await expect(access(resolve(".pi/facets/presets/implementation-review.md"))).rejects.toThrow();
  });

  it("defines OKF capture reference and research workflow links", async () => {
    const reference = await readFile(resolve(".pi/skills/references/okf-artifacts.md"), "utf8");
    expect(reference).toContain("type: Reference");
    expect(reference).toContain("type: Research Synthesis");
    for (const skill of ["competitor-analysis", "technical-review"]) {
      await expect(readFile(resolve(".pi/skills", skill, "SKILL.md"), "utf8")).resolves.toContain("../references/okf-artifacts.md");
    }
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

  it("defines Five Whys composition and associated skill", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve(".pi/facets/presets/five-whys.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "five-whys",
      role: "inquiry-guide",
      authority: "advisory",
      style: "inquisitive",
      skill: "five-whys",
    });
  });

  it("defines website messaging intent branches", async () => {
    const skill = await readFile(resolve(".pi/skills/website-messaging/SKILL.md"), "utf8");
    expect(skill).toContain("Review branch");
    expect(skill).toContain("Copy-direction branch");
    expect(skill).toContain("ask whether user wants diagnosis or copy direction");
  });

  it("defines web implementation delivery workflow", async () => {
    const skill = await readFile(resolve(".pi/skills/web-implementation/SKILL.md"), "utf8");
    expect(skill).toContain("Run only after explicit delivery language");
    expect(skill).toContain("Target 100 in every applicable category");
    expect(skill).toContain("OKF research artifacts");
  });

  it("defines release-readiness workflow and composition", async () => {
    const skill = await readFile(resolve(".pi/skills/release-readiness/SKILL.md"), "utf8");
    expect(skill).toContain("latest reachable Git tag");
    expect(skill).toContain("released version heading in CHANGELOG");
    expect(skill).toContain("commit only after explicit request");

    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve(".pi/facets/presets/release-readiness.md"), "utf8"),
    );
    expect(parsed.frontmatter).toMatchObject({
      name: "release-readiness",
      role: "release-steward",
      authority: "recommend-and-proceed",
      style: "structured",
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
