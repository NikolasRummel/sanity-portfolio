import { getBlogPosts } from "@/lib/sanity/sanity-utils";
import { Post } from "@/types/post";
import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from "next/image";

export default async function Blog() {
    const blogPosts: Post[] = await getBlogPosts();
    return (
        <div className="mt-32">
            {blogPosts.map((post: Post, index: number) => (
                <div key={index} className="mb-10">
                    <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                    {post.image && (
                        <div className="relative w-1/2 h-[400px]">
                            <Image
                                src={post.image}
                                alt={"img"}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-xl"
                            />
                        </div>
                    )}

                    <p className=" absolute right-0 text-gray-500 mt-2">
                        {new Date(post._createdAt).toLocaleString()}
                    </p>
                    <ReactMarkdown >
                        {post.content}
                    </ReactMarkdown>

                </div>
            ))}
        </div>
    );
}
