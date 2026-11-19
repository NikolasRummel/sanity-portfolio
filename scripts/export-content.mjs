// Usage: node scripts/export-content.mjs
// Exports all Sanity projects and blog posts to ./content/{projects,posts}/<slug>.md
import { createClient } from "@sanity/client";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const client = createClient({
  projectId: "6elo1maj",
  dataset: "production",
  apiVersion: "2023-07-20",
  useCdn: false,
});

const q = (v) => JSON.stringify(v ?? "");
const slugify = (s) =>
  String(s ?? "untitled").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function frontmatter(obj) {
  const lines = Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? `[${v.map(q).join(", ")}]` : q(v)}`);
  return `---\n${lines.join("\n")}\n---\n\n`;
}

async function exportType(type, dir, titleField, extra) {
  const docs = await client.fetch(
    `*[_type == $type]{ ..., "imageUrl": image.asset->url, "imageAlt": image.alt }`,
    { type }
  );
  await mkdir(dir, { recursive: true });
  for (const d of docs) {
    const slug = d.slug?.current || slugify(d[titleField] || d._id);
    const fm = frontmatter({
      title: d[titleField],
      slug,
      description: d.description,
      image: d.imageUrl,
      imageAlt: d.imageAlt,
      ...extra(d),
      createdAt: d._createdAt,
      updatedAt: d._updatedAt,
    });
    await writeFile(path.join(dir, `${slug}.md`), fm + (d.content ?? "") + "\n");
  }
  console.log(`${type}: exported ${docs.length} -> ${dir}`);
}

await exportType("project", "content/projects", "name", (d) => ({ url: d.url }));
await exportType("post", "content/posts", "title", (d) => ({ category: d.category }));
