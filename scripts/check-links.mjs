import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

const DIST = new URL("../dist/", import.meta.url).pathname;

// Known placeholder assets that are intentionally not present in dist.
// /blip.ogg is referenced by the SoundToggle component but the file is a
// documented placeholder from Phase 6 — it doesn't block a real deploy.
const ALLOWLIST = new Set(["/blip.ogg"]);

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

async function fileExistsInDist(href) {
  const clean = href.replace(/^\//, "").split(/[?#]/)[0] || "index.html";
  const candidates = [
    clean,
    `${clean}/index.html`,
    `${clean}.html`,
  ];
  for (const c of candidates) {
    try { await readFile(join(DIST, c)); return true; } catch {}
  }
  return false;
}

const broken = [];
for await (const file of walk(DIST)) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(file, "utf8");
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  const imgs  = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1]);
  for (const l of [...links, ...imgs]) {
    if (l.startsWith("http") || l.startsWith("mailto:") || l.startsWith("#") || l.startsWith("data:")) continue;
    if (ALLOWLIST.has(l)) continue;
    const ok = await fileExistsInDist(l);
    if (!ok) broken.push({ file: file.replace(DIST, ""), href: l });
  }
}

if (broken.length) {
  console.error("Broken internal links:");
  for (const b of broken) console.error(`  ${b.file} → ${b.href}`);
  process.exit(1);
}
console.log("All internal links resolve.");
