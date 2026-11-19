import {getBlogPost, getBlogPosts} from "@/lib/content";
import {Post} from "@/types/post";
import React from 'react';
import FeaturedBlogPostCard from "@/components/FeaturedBlogPostCard";
import BlogPostsGrid from "@/components/BlogPostsGrid";

export default async function Blog() {
    const allPosts: Post[] = getBlogPosts();
    const featuredPost: Post = allPosts.find((p) => p.slug === "math-camp") ?? allPosts[0];
    const posts: Post[] = allPosts.filter((post) => post.slug !== featuredPost.slug);

    return (
        <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-32 ">
            <h1 className="mb-28">
                <span
                    className="block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  My Blog
                </span>
                <span className="block max-w-2xl mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  Dive into personal posts and helpful content.
                </span>
            </h1>

            <FeaturedBlogPostCard post={featuredPost}/>

            <div className="mt-32">
                <BlogPostsGrid  posts={posts}/>
            </div>
        </div>
    );
}
