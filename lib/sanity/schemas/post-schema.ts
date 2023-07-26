const blogPost = {
    name: "post",
    title: "Blog Post",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {source: "name"}
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: {hotspot: true},
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string"
                }
            ]
        },
        {
            name: "description",
            title: "Description",
            type: "string"
        },
        {
            name: "content",
            title: "Content",
            type: "markdown",
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [
                {
                    type: 'string',
                },
            ],
            options: {
                list: [
                    { title: 'Personal', value: 'personal' },
                    { title: 'Tech', value: 'tech' },
                    { title: 'Education', value: 'education' },
                ],
            },
        },
    ]
}

export default blogPost;