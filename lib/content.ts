import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {Post} from "@/types/post";
import {Project} from "@/types/project";

const CONTENT_DIR = path.join(process.cwd(), "content");

function readDir(dir: string) {
    const full = path.join(CONTENT_DIR, dir);
    return fs
        .readdirSync(full)
        .filter((f) => f.endsWith(".md"))
        .map((f) => {
            const {data, content} = matter(fs.readFileSync(path.join(full, f), "utf8"));
            return {data, content, slug: (data.slug as string) ?? f.replace(/\.md$/, "")};
        });
}

const byNewest = (a: {createdAt: string}, b: {createdAt: string}) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

function toPost({data, content, slug}: ReturnType<typeof readDir>[number]): Post {
    return {
        slug,
        title: data.title,
        image: data.image ?? "",
        description: data.description ?? "",
        category: data.category ?? [],
        createdAt: data.createdAt,
        content,
    };
}

function toProject({data, content, slug}: ReturnType<typeof readDir>[number]): Project {
    return {
        slug,
        name: data.title,
        image: data.image ?? "",
        url: data.url ?? "",
        description: data.description ?? "",
        createdAt: data.createdAt,
        content,
    };
}

export function getBlogPosts(): Post[] {
    return readDir("posts").map(toPost).sort(byNewest);
}

export function getBlogPost(slug: string): Post | undefined {
    return getBlogPosts().find((p) => p.slug === slug);
}

export function getProjects(): Project[] {
    return readDir("projects").map(toProject).sort(byNewest);
}

export function getProject(slug: string): Project | undefined {
    return getProjects().find((p) => p.slug === slug);
}
