"use client";

import React from 'react';
import Image from "next/image";
import {Post} from "@/types/post";
import ButtonLink from "@/components/ButtonLink";

interface FeaturedBlogPostCardProps {
    post: Post
}

const FeaturedBlogPostCard = ({post}: FeaturedBlogPostCardProps) => {
    return (
        <div className="space-y-2 text-left hover:cursor-pointer group"
             onClick={() => {
                 window.location.href = `/blog/${post.slug}`;
             }}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <div className="col-span-1">
                    <div className="flex items-center mt-4 md:justify-start">
                        <p className="m-0 text-lg">Featured article</p>
                    </div>
                    <h2 className="my-3 font-bold text-3xl ">{post.title}</h2>
                    <p>{post.description}</p>

                    <ButtonLink
                        text="Read"
                        href={`/blog/${post.slug}`}
                    />
                </div>
                <Image
                    className="rounded-3xl transform group-hover:scale-105 w-full object-cover h-96"
                    src={post.image}
                    width={320}
                    height={184}
                    alt={'article cover'}
                />
            </div>
        </div>
    );
};

export default FeaturedBlogPostCard;