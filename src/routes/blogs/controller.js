const db = require("../../database/models");
const blogService = require("./service")

module.exports = {
    createBlog: async (req, res) => {
        try {
            const { title } = req.body
            if (!title) {
                return res.status(400).json({
                    message: 'Title cannot be empty!'
                })
            }

            const blog = await blogService.createBlog(title)

            if (blog.error) throw new Error(blog.error)

            res.status(200).json(blog)
        } catch (error) {
            console.log(error)
            res.status(500).statusText("blah blah").json({ error: 'Something went wrong!' })
        }
    },

    getBlogs: async (req, res) => {
        try {
            const blogs = await blogService.getBlogs()
            if (blogs.message) { return res.status(404).json(blogs) }
            else if (blogs.error) throw new Error(blogs.error)

            res.status(200).json(blogs);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    },

    getOneBlog: async (req, res) => {
        try {
            const { blogId } = req.params
            const blog = await blogService.getOneBlog(blogId)
            if (blog.message) { return res.status(404).json(blog) }
            else if (blog.error) throw new Error(blog.error)
            res.status(200).json(blog)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    }
}