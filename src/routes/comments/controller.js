const commentService = require('./service')

const isValidUUIDv4 = (uuid) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(uuid);
}
module.exports = {
    createComment: async (req, res) => {
        try {
            const { blogId } = req.params
            if (!blogId || !isValidUUIDv4(blogId)) return res.status(400).json({ message: "Invalid 'blogId'!" })

            const { comment } = req.body
            if (!comment) return res.status(400).json({ message: "Comment cannot be empty!" })

            const newComment = await commentService.createComment(blogId, comment)
            if (newComment.error) throw new Error(newComment.error)

            res.status(200).json(newComment)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    },

    getComments: async (req, res) => {
        try {
            const { blogId } = req.params
            if (!blogId || !isValidUUIDv4(blogId)) return res.status(400).json({ message: "Invalid 'blogId'!" })

            const comments = await commentService.getComments(blogId)
            if (comments.message) return res.status(404).json(comments)
            if (comments.error) throw new Error(comments.error)

            return res.status(200).json(comments)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    },
    getAComment: async (req, res) => {
        try {
            const { commentId } = req.params
            if (!commentId || !isValidUUIDv4(commentId)) return res.status(400).json({ message: "Invalid 'commentId'!" })

            const comment = await commentService.getAComment(commentId)
            if (comment.message) return res.status(404).json(comment)
            if (comment.error) throw new Error(comment.error)

            return res.status(200).json(comment)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    },
}