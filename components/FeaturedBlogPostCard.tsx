"use client";

import React from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Post} from "@/types/post";
import ButtonLink from "@/components/ButtonLink";

interface FeaturedBlogPostCardProps {
    post: Post
}

const FeaturedBlogPostCard = ({post}: FeaturedBlogPostCardProps) => {
    const router = useRouter();
    return (
        <article className="featured" onClick={() => router.push(`/blog/${post.slug}`)}>
            <div className="featured__text">
                <p className="small">Empfohlener Beitrag</p>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <ButtonLink text="Lesen" href={`/blog/${post.slug}`}/>
            </div>
            <Image src={post.image} width={960} height={640} alt={'Titelbild des Beitrags'}/>
        </article>
    );
};

export default FeaturedBlogPostCard;
