import React from 'react';
import Image from "next/image";
import {Post} from "@/types/post";
import {serializeMdx} from "@/lib/mdx";
import {MdxContent} from "@/components/mdx-content";

interface BlogPostContentProps {
    post: Post
}

const BlogPostContent = async ({post}: BlogPostContentProps) => {


    const publishedOn = new Date(post.createdAt).toLocaleDateString(
        "de-DE",
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );

    const serialized = await serializeMdx(post.content);

    return (
        <div>
            <header className="page-head" style={{maxWidth: "44rem", marginInline: "auto"}}>
                <h1>{post.title}</h1>
                <p className="small">{publishedOn}</p>
            </header>
            {post.image && (
                <div className="article-cover">
                    <Image src={post.image} alt="" width={1600} height={800} sizes="100vw" priority style={{objectFit: "cover"}}/>
                </div>
            )}

            <div className="prose">
                <MdxContent source={serialized.serialized}/>
            </div>
        </div>
    );
};
export default BlogPostContent;
