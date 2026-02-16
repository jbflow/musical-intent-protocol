import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { IntentOrArraySchema } from "../src/v0_1/zod";

describe("example validation", () => {
  const examplesDir = path.join(process.cwd(), "examples");
  const exampleFiles = fs
    .readdirSync(examplesDir)
    .filter((file) => file.endsWith(".json"));

  for (const file of exampleFiles) {
    it(`validates ${file}`, () => {
      const raw = fs.readFileSync(path.join(examplesDir, file), "utf-8");
      const parsed = JSON.parse(raw);
      const result = IntentOrArraySchema.safeParse(parsed);
      expect(result.success).toBe(true);
    });
  }
});
