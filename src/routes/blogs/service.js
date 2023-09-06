const db = require("../../database/models");

module.exports = {
    createBlog: async (title) => {
        try {
            const blog = await db.Blogs.create({ title })
            return blog
        } catch (error) {
            console.log(`#createBlog: Error: ${error.message}`)
            return { error: `#createBlog: Error: ${error.message}` }
        }
    },

    getBlogs: async () => {
        try {
            const blogs = await db.Blogs.findAll({
                include: [{
                    model: db.Comments,
                    include: [
                        { model: db.Replies },
                    ],
                },
                ],
            });

            if (!blogs.length) return { message: 'Looks like your blog collection is empty!' }

            return blogs
        } catch (error) {
            console.log(`#createBlog: Error: ${error.message}`)
            return { error: `#createBlog: Error: ${error.message}` }
        }
    },

    getOneBlog: async (blogId) => {
        try {
            const blog = await db.Blogs.findOne({
                where: { id: blogId },
                include: [
                    {
                        model: db.Comments,
                        include: [
                            {
                                model: db.Replies,
                            },
                        ],
                    },
                ],
            });
            if (!blog) return { message: "Oops, it seems like the blog you're after has gone on a little adventure. Let's find it together! Please recheck the ID and give it another shot." }

            return blog

        } catch (error) {
            console.log(`#createBlog: Error: ${error.message}`)
            return { error: `#createBlog: Error: ${error.message}` }
        }
    }
}