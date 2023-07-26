import {getBlogPost} from "@/lib/sanity/sanity-utils";
import BlogPostContent from "@/components/BlogPostContent";

type Props = {
    params: { post: string }
}

export default async function BlogPost({params}: Props) {
    const slug = params.post;
    const post = await getBlogPost(slug);

    return (
        <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
            <BlogPostContent post={post}/>
        </section>
    )
}