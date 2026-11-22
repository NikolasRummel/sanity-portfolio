import type {Metadata} from "next";
import {getBlogPosts} from "@/lib/content";
import {Post} from "@/types/post";
import React from 'react';
import FeaturedBlogPostCard from "@/components/FeaturedBlogPostCard";
import BlogPostsGrid from "@/components/BlogPostsGrid";

export const metadata: Metadata = {
    title: "Blog",
    description: "Beiträge von Nikolas Rummel über Studium, Auslandssemester, Arbeit und Projekte.",
    alternates: {canonical: "/blog"},
}

export default async function Blog() {
    const allPosts: Post[] = getBlogPosts();
    const featuredPost: Post = allPosts.find((p) => p.slug === "math-camp") ?? allPosts[0];
    const posts: Post[] = allPosts.filter((post) => post.slug !== featuredPost.slug);

    return (
        <div className="ki page">
            <div className="container" style={{paddingBottom: "var(--section-gap-s)"}}>
                <header className="page-head">
                    <h1>Mein Blog</h1>
                    <p className="lead">Persönliche Beiträge und hilfreiche Inhalte.</p>
                </header>

                <FeaturedBlogPostCard post={featuredPost}/>

                <div style={{marginTop: "var(--section-gap-s)"}}>
                    <BlogPostsGrid posts={posts}/>
                </div>
            </div>
        </div>
    );
}
