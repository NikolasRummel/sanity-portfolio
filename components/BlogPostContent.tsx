import React from 'react';
import Image from "next/image";
import {Post} from "@/types/post";
import {serializeMdx} from "@/lib/mdx";
import {MdxContent} from "@/components/mdx-content";

interface BlogPostContentProps {
    post: Post
}

const BlogPostContent = async ({post}: BlogPostContentProps) => {


    const publishedOn = new Date(post._createdAt).toLocaleDateString(
        "US",
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    );

    const serialized = await serializeMdx(post.content);

    // @ts-ignore
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

            <div className={'mt-32'}>
                <MdxContent source={serialized.serialized} />
            </div>
        </div>
    );
};
export default BlogPostContent;