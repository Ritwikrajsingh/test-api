const db = require("../../database/models");
const blogService = require("./service")

module.exports = {
    createBlog: async (req, res) => {
        try {
            const { title } = req.body
            if (!title) return res.status(400).json({ message: 'title cannot be empty' })
            const blog = await blogService.createBlog(title)
            res.status(200).json(blog)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: 'Something went wrong!' })
        }
    },

    getBlogs: async (req, res) => {
        try {
            const blogs = await db.Blogs.findAll({
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

            res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    getOneBlog: async (req, res) => {
        try {
            const { blogId } = req.params
            console.log(blogId);
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
            res.status(200).json(blog)
        } catch (error) {
            console.log(error)
        }
    }
}