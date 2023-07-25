import {createClient, groq} from "next-sanity";
import {Project} from "@/types/project";
import clientConfig from "@/lib/sanity/config/client-config";

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