import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("La page Audrey existe et contient son nom", () => {
  const page = readFileSync(
    new URL("../src/pages/Audrey.jsx", import.meta.url),
    "utf8"
  );

  assert.match(page, /Audrey/);
});

test("La page Audrey possède un lien de retour", () => {
  const page = readFileSync(
    new URL("../src/pages/Audrey.jsx", import.meta.url),
    "utf8"
  );

  assert.match(page, /Back to Teamspace/);
});