import {createClient, groq} from "next-sanity";
import {Project} from "@/types/project";
import clientConfig from "@/lib/sanity/config/client-config";
import {Post} from "@/types/post";

export async function getProjects(): Promise<Project[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "project"]{
            _id,
            _createdAt,
             name,
             "slug": slug.current,
             "image": image.asset->url,
             url,
             description,
             content
        }`
    );
}

export async function getProject(slug: string): Promise<Project> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "project" && slug.current == $slug][0]{
            _id,
            _createdAt,
             name,
             "slug": slug.current,
             "image": image.asset->url,
             url,
             description,
             content
        }`,
        {slug}
    );
}

export async function getBlogPosts(): Promise<Post[]> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "post"]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "image": image.asset->url,
            description,
            content,
            category
        }`
    );
}

export async function getBlogPost(slug: string): Promise<Post> {
    return createClient(clientConfig).fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            "slug": slug.current,
            "image": image.asset->url,
            description,
            content,
            category
        }`,
        { slug }
    );
}
