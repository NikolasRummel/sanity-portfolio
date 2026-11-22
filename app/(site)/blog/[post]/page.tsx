import {getBlogPost, getBlogPosts} from "@/lib/content";
import {notFound} from "next/navigation";
import BlogPostContent from "@/components/BlogPostContent";

type Props = {
    params: Promise<{ post: string }>
}


export function generateStaticParams() {
    return getBlogPosts().map((x) => ({post: x.slug}));
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