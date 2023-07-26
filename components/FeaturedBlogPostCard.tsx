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
                        text="Visit"
                        href={`/blog/${post.slug}`}
                    />
                </div>
                <Image
                    className="rounded-3xl transform group-hover:scale-105"
                    objectFit="fill"
                    src={post.image}
                    placeholder="blur"
                    blurDataURL={post.image}
                    width={1200}
                    height={684}
                    layout="intrinsic"
                    alt={'article cover'}
                />
            </div>
        </div>
    );
};

export default FeaturedBlogPostCard;