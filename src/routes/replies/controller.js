const replyService = require('./service')

const isValidUUIDv4 = (uuid) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89ab][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(uuid);
}

module.exports = {
    createReply: async (req, res) => {
        try {
            const { commentId } = req.params
            if (!commentId || !isValidUUIDv4(commentId)) return res.status(400).json({ message: "Invalid 'commentId'!" })

            const { comment } = req.body
            if (!comment) return res.status(400).json({ message: "Comment cannot be empty!" })

            const reply = await replyService.createReply(commentId, comment)
            if (reply.error) throw new Error(reply.error)

            res.status(200).json(reply)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    },

    getReplies: async (req, res) => {
        try {
            const { commentId } = req.params
            if (!commentId || !isValidUUIDv4(commentId)) return res.status(400).json({ message: "Invalid 'commentId'!" })

            const replies = await replyService.getReplies(commentId)
            if (replies.message) return res.status(404).json(replies)
            if (replies.error) throw new Error(replies.error)
            res.status(200).json(replies)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Something went wrong!" });
        }
    }
}