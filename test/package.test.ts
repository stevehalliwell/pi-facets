import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

type PackageManifest = {
  pi: { extensions: string[]; skills: string[] };
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
  });

  it("loads this repository through project Pi settings", async () => {
    const settings = await readJson<PiSettings>(resolve(".pi/settings.json"));

    expect(settings.packages).toContain("..");
  });
});
