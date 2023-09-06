const db = require("../database/models");

module.exports = {
    welcome: (req, res) => {
        return res.status(200).send('<h1>Hello World!</h1>')
    },

    createBlog: async (req, res) => {
        try {
            const { title } = req.body
            const blog = await db.Blogs.create({ title })
            console.log(title)
            res.status(200).json(blog)
        } catch (error) {
            console.log(error)
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
            res.status(500).json({ error: "Something went wrong!" });
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
    },

    createComment: async (req, res) => {
        try {
            const { blogId } = req.params
            const { comment } = req.body
            const newComment = await db.Comments.create({ comment, BlogId: blogId })
            console.log(blogId, comment)
            res.status(200).json(newComment)
        } catch (error) {
            console.log(error)
        }
    },

    getComment: async (req, res) => {
        try {
            const { blogId } = req.params
            const comment = await db.Comments.findAll({
                where: { BlogId: blogId },
                include:
                {
                    model: db.Replies,
                }
            })
            res.status(200).json(comment)
        } catch (error) {
            console.log(error)
        }
    },

    createReply: async (req, res) => {
        try {
            const { commentId } = req.params
            const { comment } = req.body
            const reply = await db.Replies.create(
                { reply: comment, CommentId: commentId }
            )
            console.log(commentId)
            res.status(200).json(reply)
        } catch (error) {
            console.log(error)
        }
    },

    getReply: async (req, res) => {
        try {
            const { commentId } = req.params
            const reply = await db.Replies.findOne({ CommentId: commentId })
            console.log(commentId)
            res.status(200).json({ reply })
        } catch (error) {
            console.log(error)
        }
    }


}