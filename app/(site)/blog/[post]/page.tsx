import {getBlogPost, getBlogPosts} from "@/lib/content";
import {notFound} from "next/navigation";
import type {Metadata} from "next";
import BlogPostContent from "@/components/BlogPostContent";

type Props = {
    params: Promise<{ post: string }>
}


export function generateStaticParams() {
    return getBlogPosts().map((x) => ({post: x.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const post = getBlogPost((await params).post);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description,
        alternates: {canonical: `/blog/${post.slug}`},
        openGraph: {
            type: "article",
            title: post.title,
            description: post.description,
            url: `/blog/${post.slug}`,
            publishedTime: post.createdAt,
            ...(post.image.startsWith("/") ? {images: [post.image]} : {}),
        },
    };
}

export default async function BlogPost({params}: Props) {
    const slug = (await params).post;
    const post = getBlogPost(slug);
    if (!post) notFound();

    return (
        <section className="ki page container" style={{paddingBottom: "var(--section-gap-s)"}}>
            <BlogPostContent post={post}/>
        </section>
    )
}