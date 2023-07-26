import {getBlogPosts} from "@/lib/sanity/sanity-utils";
import {Post} from "@/types/post";
import React from 'react';
import BlogPostCard from "@/components/BlogPostCard";

export default async function Blog() {
    const blogPosts: Post[] = await getBlogPosts();
    return (
        <div className="my-32">
            <h1 className="mb-28">
                <span
                    className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  My Blog
                </span>
                <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  Dive into personal posts and helpful content.
                </span>
            </h1>
            {blogPosts.map((post: Post, index: number) => (
                <div key={index} className="mb-10">
                    <BlogPostCard post={post}/>
                </div>
            ))}
        </div>
    );
}
