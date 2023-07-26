import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypeSlug from 'rehype-slug';
import rehypePrismPlus from 'rehype-prism-plus';

type FrontMatter = {
    title: string;
    date: string;
};

export async function serializeMdx(source: string) {
    const serialized = await serialize(source, {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeSlug,
                rehypeCodeTitles,
                rehypePrismPlus,
            ],
            format: 'mdx',
        },
    });

    // Typecast the frontmatter to the correct type
    const frontmatter = serialized.frontmatter as FrontMatter;

    return {
        frontmatter,
        serialized,
    };
}
