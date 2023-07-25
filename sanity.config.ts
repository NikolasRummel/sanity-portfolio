import {defineConfig} from 'sanity';
import {deskTool} from "sanity/desk";
import schemas from "@/lib/sanity/schemas";
import {markdownSchema} from "sanity-plugin-markdown";

const config = defineConfig({
    projectId: "6elo1maj",
    dataset: "production",
    title: "My Personal Website",
    apiVersion: "2023-07-20",
    basePath: "/admin",
    plugins: [deskTool(),  markdownSchema()],
    schema: {types: schemas}
});

export default config;