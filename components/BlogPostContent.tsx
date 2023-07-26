import React from 'react';
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {Post} from "@/types/post";

interface BlogPostContentProps {
    post: Post
}

const BlogPostContent = ({post}: BlogPostContentProps) => {
    const publishedOn = new Date(post._createdAt).toLocaleDateString(
        "DE",
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );
    return (
        <div>
            <h1 className="my-16">
                    <span className="block  mx-auto mt-2 text-4xl font-bold leading-10 text-center sm:text-5xl">
                  {post.title}
                </span>
                <span
                    className="mt-2 block text-base font-semibold tracking-wide text-center text-sky-600 dark:text-teal-400 uppercase">
                  {publishedOn}
                </span>
            </h1>
            {post.image && (
                <div>
                    <div
                        className="aspect-video lg:aspect-[2/1]"
                        style={{position: 'relative', overflow: 'hidden'}}
                    >
                        <Image
                            className="rounded-3xl"
                            layout="fill"
                            sizes="100vw"
                            objectFit="cover"
                            src={post.image}
                            alt={":("}
                            priority
                        />
                    </div>
                </div>
            )}

            <div className={"mt-32"}>
                <ReactMarkdown>
                    {post.content}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default BlogPostContent;