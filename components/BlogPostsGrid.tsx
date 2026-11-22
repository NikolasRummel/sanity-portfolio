"use client";

import React, {useState} from 'react';
import Image from "next/image";
import {useRouter} from "next/navigation";
import {Post} from "@/types/post";
import {formatDate} from "@/lib/utils";

const BlogPostsGrid = ({posts}: { posts: Post[] }) => {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState("all");

    const categories = [
        { label: 'Alle', value: 'all' },
        { label: 'Persönlich', value: 'personal' },
        { label: 'Tech', value: 'tech' },
    ];

    const filteredArticles = posts.filter(post => {
        if (selectedCategory === "all") return true;
        return post.category.includes(selectedCategory);
    });

    return (
        <div>
            <div className="chips" role="group" aria-label="Filtern">
                {categories.map((category) => (
                    <button
                        key={category.value}
                        type="button"
                        className="chip"
                        aria-pressed={selectedCategory === category.value}
                        onClick={() => setSelectedCategory(category.value)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <div className="post-grid">
                {filteredArticles.map((article, index) => (
                    <article key={index} className="post" onClick={() => {
                        router.push(`/blog/${article.slug}`);
                    }}>
                        <Image src={article.image} width="1000" height="1000" alt="Beitragsbild"/>
                        <h2>{article.title}</h2>
                        <p className="small">{formatDate(article.createdAt)}</p>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogPostsGrid;
