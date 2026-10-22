// After `next build`: the browser asks for a segment prefetch as one file
// name (blog/x/__next.blog.$d$slug.__PAGE__.txt), but the static export
// writes it as folders (blog/x/__next.blog/$d$slug/__PAGE__.txt). Copy each
// one to the flat name too, so any static host serves it without a rewrite.
import { copyFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const root = process.argv[2] ?? "out";
let copied = 0;

function files(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
}

function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const path = join(dir, e.name);
    if (!e.name.startsWith("__next.")) {
      walk(path);
      continue;
    }
    for (const file of files(path)) {
      copyFileSync(file, join(dir, relative(dir, file).split(sep).join(".")));
      copied++;
    }
  }
}

walk(root);
console.log(`flatten-prefetch: ${copied} segment prefetch files copied to their flat names`);
