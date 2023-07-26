"use client";

import React, {useState} from 'react';
import Image from "next/image";
import {Post} from "@/types/post";
import {formatDate} from "@/lib/utils";

const BlogPostsGrid = ({posts}: { posts: Post[] }) => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    // extract all categories from posts
    const uniqueCategories = Array.from(new Set(posts.map((post) => post.category)))
        .filter((category) => category !== null);

    const categories = [
        {label: 'All', value: 'all'},
        ...uniqueCategories.map((category) => ({label: category, value: category || 'unknown'})),
    ];

    const filteredArticles = posts.filter(post => {
        if (selectedCategory === "all") return true;
        return post.category === selectedCategory;
    });

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                {categories.map((category) => (
                    <button
                        key={category.value}
                        className={`px-3 py-1 rounded-full ${
                            selectedCategory === category.value ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                        }`}
                        onClick={() => setSelectedCategory(category.value)}
                    >
                        {category.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredArticles.map((article, index) => (
                    <div key={index} className="group grid-item h-4/5" onClick={() => {
                        window.location.href = `/blog/${article.slug}`;
                    }}>
                        <Image src={article.image} width="1000" height="1000" alt="Blog image" className="w-full h-96 object-cover rounded-xl group-hover:opacity-80 "/>
                        <h2 className="mt-2 mb-1">{article.title}</h2>
                        <div className="relative flex">
                            <p className="text-base">{formatDate(article._createdAt)}</p>
                            {/* <p className="text-base absolute right-0">6 min read</p>*/}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPostsGrid;
