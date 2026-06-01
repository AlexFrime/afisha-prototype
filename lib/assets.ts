/* ───────────────────────────────────────────────────────────────────────────
   ASSET MAP
   ---------------------------------------------------------------------------
   Every image/icon used on the page. Each entry has:
     • remote: the Figma-hosted URL (works for ~7 days from generation)
     • local:  the path it will live at once you run `npm run assets`
   Components import from here, so when you localize the images nothing else
   needs to change — flip USE_LOCAL to true after running the download script.

   To localize (run on YOUR machine — Figma is reachable there):
       npm run assets        // downloads everything into /public/img
   then set USE_LOCAL = true below and restart the dev server.
─────────────────────────────────────────────────────────────────────────── */

export const USE_LOCAL = true; // ← set true after running `npm run assets`

type Asset = { remote: string; local: string };

export const ASSETS = {
  hero:        { remote: "https://www.figma.com/api/mcp/asset/75584dfa-e629-4338-b884-80f1909b7aea", local: "/img/hero.png" },
  director:    { remote: "https://www.figma.com/api/mcp/asset/15397d30-163b-46cf-9467-e22b42894c28", local: "/img/director.png" },
  detCast:     { remote: "https://www.figma.com/api/mcp/asset/16363b3f-848d-44fa-84f7-aa99a2715664", local: "/img/det-cast.png" },
  detCostumes: { remote: "https://www.figma.com/api/mcp/asset/eecc5306-807c-4317-8b4b-3f2b036eb670", local: "/img/det-costumes.png" },
  detDecor:    { remote: "https://www.figma.com/api/mcp/asset/9e8477c9-ecd4-4241-9d54-f95eb0e9eb31", local: "/img/det-decor.png" },
  detChoreo:   { remote: "https://www.figma.com/api/mcp/asset/008d4306-8b11-4a53-865b-fb2c6cba551a", local: "/img/det-choreo.png" },
  detArtists:  { remote: "https://www.figma.com/api/mcp/asset/c9777e62-f1a1-4226-8936-a8d7e234a9f9", local: "/img/det-artists.png" },
  theatre:     { remote: "https://www.figma.com/api/mcp/asset/25132b40-958f-4c03-984a-7605edd99bd8", local: "/img/theatre.png" },
} satisfies Record<string, Asset>;

export function asset(a: Asset): string {
  return USE_LOCAL ? a.local : a.remote;
}
