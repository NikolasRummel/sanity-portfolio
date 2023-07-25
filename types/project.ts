import {PortableTextBlock} from "sanity";

export type Project = {
    _id: string,
    _createdAt: Date,
    name: string,
    slug: string,
    image: string,
    url: string,
    description: string,
    content: PortableTextBlock[];
}