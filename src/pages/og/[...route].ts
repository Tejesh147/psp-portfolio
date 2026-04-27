import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const projects = await getCollection("projects", ({ data }) => !data.draft);

const pages = {
  // Default OG image for non-project pages
  "default": {
    title: "Tejesh Arujuna",
    description: "Engineer · Personal portfolio in PSP firmware style.",
  },
  // Per-project OG images keyed by project id
  ...Object.fromEntries(
    projects.map((p) => [
      p.id,
      { title: p.data.title, description: `${p.data.role} · ${p.data.year}` },
    ])
  ),
};

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: "route",
  getImageOptions: (_, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[13, 27, 42], [22, 36, 71]],
    border: { color: [79, 195, 247], width: 4, side: "inline-start" },
    padding: 60,
  }),
});
