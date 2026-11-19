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
        <section className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <BlogPostContent post={post}/>
        </section>
    )
}