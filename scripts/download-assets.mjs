/* Downloads all Figma assets listed in lib/assets.ts into /public.
   Run on your machine (where figma.com is reachable):  npm run assets       */
import { writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// keep this list in sync with lib/assets.ts
const ASSETS = [
  ["https://www.figma.com/api/mcp/asset/75584dfa-e629-4338-b884-80f1909b7aea", "/img/hero.png"],
  ["https://www.figma.com/api/mcp/asset/15397d30-163b-46cf-9467-e22b42894c28", "/img/director.png"],
  ["https://www.figma.com/api/mcp/asset/16363b3f-848d-44fa-84f7-aa99a2715664", "/img/det-cast.png"],
  ["https://www.figma.com/api/mcp/asset/eecc5306-807c-4317-8b4b-3f2b036eb670", "/img/det-costumes.png"],
  ["https://www.figma.com/api/mcp/asset/9e8477c9-ecd4-4241-9d54-f95eb0e9eb31", "/img/det-decor.png"],
  ["https://www.figma.com/api/mcp/asset/008d4306-8b11-4a53-865b-fb2c6cba551a", "/img/det-choreo.png"],
  ["https://www.figma.com/api/mcp/asset/c9777e62-f1a1-4226-8936-a8d7e234a9f9", "/img/det-artists.png"],
  ["https://www.figma.com/api/mcp/asset/25132b40-958f-4c03-984a-7605edd99bd8", "/img/theatre.png"],
];

await mkdir(join(root, "public/img"), { recursive: true });

let ok = 0;
for (const [url, dest] of ASSETS) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const out = join(root, "public", dest);
    await mkdir(dirname(out), { recursive: true });
    await writeFile(out, buf);
    console.log(`✓ ${dest}  (${(buf.length / 1024).toFixed(0)} KB)`);
    ok++;
  } catch (e) {
    console.error(`✗ ${dest}  — ${e.message}`);
  }
}
console.log(`\nDone: ${ok}/${ASSETS.length} downloaded.`);
console.log("Now set USE_LOCAL = true in lib/assets.ts and restart the dev server.");
