import React from 'react';
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import {Post} from "@/types/post";

interface BlogPostCardProps {
    post: Post
}

const BlogPostCard = ({post} : BlogPostCardProps) => {
    return (
        <div>
            <div className="mb-10">
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
                <ReactMarkdown>
                    {post.content}
                </ReactMarkdown>

            </div>
        </div>
    );
};

export default BlogPostCard;