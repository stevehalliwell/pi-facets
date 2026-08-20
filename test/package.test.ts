import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { parseFrontmatter } from "@earendil-works/pi-coding-agent";

type PackageManifest = {
  bin: { "pi-facets": string };
  pi: { extensions: string[]; skills?: string[]; prompts?: string[] };
};

type PiSettings = { packages: string[] };

async function readJson<T>(path: string): Promise<T> {
  return JSON.parse(await readFile(path, "utf8")) as T;
}

describe("local Pi package setup", () => {
  it("declares package resources", async () => {
    const manifest = await readJson<PackageManifest>(resolve("package.json"));

    expect(manifest.bin).toEqual({ "pi-facets": "./scripts/install.mjs" });
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
      "examples/pi-resources/skills/backlog-capture/SKILL.md",
      "examples/pi-resources/skills/backlog-refinement/SKILL.md",
      "examples/pi-resources/skills/brainstorming/SKILL.md",
      "examples/pi-resources/skills/competitor-analysis/SKILL.md",
      "examples/pi-resources/skills/editorial-review/SKILL.md",
      "examples/pi-resources/skills/facet-alignment/SKILL.md",
      "examples/pi-resources/skills/facet-craft/SKILL.md",
      "examples/pi-resources/skills/six-thinking-hats/SKILL.md",
      "examples/pi-resources/skills/references/okf-artifacts.md",
      "examples/pi-resources/skills/implementation/SKILL.md",
      "examples/pi-resources/skills/iteration/SKILL.md",
      "examples/pi-resources/skills/note-taking/SKILL.md",
      "examples/pi-resources/skills/web-implementation/SKILL.md",
      "examples/pi-resources/skills/threejs-performance/SKILL.md",
      "examples/pi-resources/skills/release-readiness/SKILL.md",
      "examples/pi-resources/skills/technical-review/SKILL.md",
      "examples/pi-resources/skills/messaging-strategy/SKILL.md",
      "examples/pi-resources/skills/website-art-direction/SKILL.md",
      "examples/pi-resources/facets/roles/marketing-strategist.md",
      "examples/pi-resources/facets/roles/researcher.md",
      "examples/pi-resources/facets/roles/inquiry-guide.md",
      "examples/pi-resources/facets/roles/note-taker.md",
      "examples/pi-resources/facets/roles/delivery-lead.md",
      "examples/pi-resources/facets/roles/web-platform-specialist.md",
      "examples/pi-resources/facets/roles/release-steward.md",
      "examples/pi-resources/facets/roles/dev-peer.activation.md",
      "examples/pi-resources/facets/style/concise.activation.md",
      "examples/pi-resources/facets/style/exploratory.md",
      "examples/pi-resources/facets/style/explanatory.md",
      "examples/pi-resources/facets/style/structured.md",
      "examples/pi-resources/facets/style/inquisitive.md",
      "examples/pi-resources/facets/style/iterative.md",
      "examples/pi-resources/facets/presets/technical-review.md",
      "examples/pi-resources/facets/presets/implementation-partner.md",
      "examples/pi-resources/facets/presets/tweaking.md",
      "examples/pi-resources/facets/presets/web-implementation.md",
      "examples/pi-resources/facets/presets/backlog-capture.md",
      "examples/pi-resources/facets/presets/backlog-refinement.md",
      "examples/pi-resources/facets/presets/brainstorming.md",
      "examples/pi-resources/facets/presets/note-taker.md",
      "examples/pi-resources/facets/presets/messaging-strategy.md",
      "examples/pi-resources/facets/presets/research-exploration.md",
      "examples/pi-resources/facets/presets/release-readiness.md",
      "docs/facet-grid.md",
    ];

    for (const resource of resources) {
      await expect(access(resolve(resource))).resolves.toBeUndefined();
    }
    await expect(access(resolve("examples/pi-resources/facets/presets/implementation-review.md"))).rejects.toThrow();
  });

  it("defines OKF capture reference and research workflow links", async () => {
    const reference = await readFile(resolve("examples/pi-resources/skills/references/okf-artifacts.md"), "utf8");
    expect(reference).toContain("type: Reference");
    expect(reference).toContain("type: Research Synthesis");
    for (const skill of ["competitor-analysis", "technical-review"]) {
      await expect(readFile(resolve("examples/pi-resources/skills", skill, "SKILL.md"), "utf8")).resolves.toContain("../references/okf-artifacts.md");
    }
  });

  it("defines implementation-partner composition", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/implementation-partner.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "implementation-partner",
      role: "dev-peer",
      authority: "recommend-and-proceed",
      style: "concise",
    });
  });

  it("defines brainstorming composition and associated skill", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/brainstorming.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "brainstorming",
      role: "pragmatic-collaborator",
      authority: "advisory",
      style: "exploratory",
      skill: "brainstorming",
    });
  });

  it("defines note-taker composition and associated skill", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/note-taker.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "note-taker",
      role: "note-taker",
      authority: "recommend-and-proceed",
      style: "concise",
      skill: "note-taking",
    });
  });

  it("defines tweaking composition and associated skill", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/tweaking.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "tweaking",
      role: "dev-peer",
      authority: "recommend-and-proceed",
      style: "iterative",
      skill: "iteration",
    });
  });

  it("associates every paired preset with its project skill", async () => {
    const pairs = {
      "backlog-capture": "backlog-capture",
      "backlog-refinement": "backlog-refinement",
      brainstorming: "brainstorming",
      "note-taker": "note-taking",
      "editorial-review": "editorial-review",
      "implementation-partner": "implementation",
      tweaking: "iteration",
      "messaging-strategy": "messaging-strategy",
      "release-readiness": "release-readiness",
      "technical-review": "technical-review",
      "visual-direction": "website-art-direction",
      "web-implementation": "web-implementation",
    };

    for (const [preset, skill] of Object.entries(pairs)) {
      const parsed = parseFrontmatter<Record<string, unknown>>(
        await readFile(resolve("examples/pi-resources/facets/presets", `${preset}.md`), "utf8"),
      );
      expect(parsed.frontmatter.skill).toBe(skill);
      expect(parsed.body.trim()).toBeTruthy();
      expect(parsed.body).not.toMatch(/use with .*skill/i);
    }
  });

  it("defines messaging-strategy intent branches", async () => {
    const skill = await readFile(resolve("examples/pi-resources/skills/messaging-strategy/SKILL.md"), "utf8");
    expect(skill).toContain("Review branch");
    expect(skill).toContain("Copy-direction branch");
    expect(skill).toContain("ask whether user wants diagnosis or copy direction");
    expect(skill).toContain("customer-facing messaging");
    expect(skill).toContain("website messaging");
  });

  it("defines web implementation delivery workflow", async () => {
    const skill = await readFile(resolve("examples/pi-resources/skills/web-implementation/SKILL.md"), "utf8");
    expect(skill).toContain("Run only after explicit delivery language");
    expect(skill).toContain("Target 100 in every applicable category");
    expect(skill).toContain("OKF research artifacts");
  });

  it("defines release-readiness workflow and composition", async () => {
    const skill = await readFile(resolve("examples/pi-resources/skills/release-readiness/SKILL.md"), "utf8");
    expect(skill).toContain("latest reachable Git tag");
    expect(skill).toContain("released version heading in CHANGELOG");
    expect(skill).toContain("commit only after explicit request");

    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/release-readiness.md"), "utf8"),
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
      await readFile(resolve("examples/pi-resources/facets/presets/web-implementation.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "web-implementation",
      role: "web-platform-specialist",
      authority: "recommend-and-proceed",
      style: "concise",
    });
  });

  it("defines backlog-capture composition", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/backlog-capture.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "backlog-capture",
      role: "product-owner",
      authority: "recommend-and-proceed",
      style: "concise",
      skill: "backlog-capture",
    });
  });

  it("defines backlog-refinement composition", async () => {
    const parsed = parseFrontmatter<Record<string, unknown>>(
      await readFile(resolve("examples/pi-resources/facets/presets/backlog-refinement.md"), "utf8"),
    );

    expect(parsed.frontmatter).toMatchObject({
      name: "backlog-refinement",
      role: "product-owner",
      authority: "advisory",
      style: "exploratory",
    });
  });

  it("defines continuous backlog-refinement guidance", async () => {
    const skill = await readFile(resolve("examples/pi-resources/skills/backlog-refinement/SKILL.md"), "utf8");

    expect(skill).toContain("`status: needs-refinement`");
    expect(skill).toContain("oldest legacy `status: todo` and `scope: draft` item");
    expect(skill).toContain("update only that item to `status: todo`");
    expect(skill).toContain("return to step 1 and select the next oldest eligible item");
    expect(skill).toContain("Use /facets to choose a different facet or workflow.");
    expect(skill).toContain("Never implement it or set it `doing`");
  });

  it("defines argument-aware prompt templates", async () => {
    for (const name of ["explore-options", "decision-brief"]) {
      const parsed = parseFrontmatter<Record<string, unknown>>(
        await readFile(resolve("examples", "pi-resources", "prompts", `${name}.md`), "utf8"),
      );
      expect(parsed.frontmatter.description).toEqual(expect.any(String));
      expect(parsed.frontmatter["argument-hint"]).toBe("<topic>");
      expect(parsed.body).toContain("$1");
    }
  });
});
