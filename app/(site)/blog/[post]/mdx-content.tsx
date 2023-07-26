'use client';

import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import CodeBlock from "@/components/CodeBlock";

type MdxContentProps = {
    source: MDXRemoteSerializeResult;
};

export function MdxContent({ source }: MdxContentProps) {
    // @ts-ignore
    return <MDXRemote {...source} components={{code: CodeBlock}} />;
}