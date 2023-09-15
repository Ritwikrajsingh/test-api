const db = require("../../database/models");

module.exports = {
    createReply: async (commentId, comment) => {
        try {
            const reply = await db.Replies.create(
                { reply: comment, CommentId: commentId }
            )
            return reply
        } catch (error) {
            console.log(`#createComment: Error: ${error.message}`)
            return { error: `#createComment: Error: ${error.message}` }
        }
    },

    getReplies: async (commentId) => {
        try {
            const replies = await db.Replies.findAll({
                where: { CommentId: commentId }
            })
            if (!replies.length) return { message: "Oops, it seems like the comment you're after has gone on a little adventure. Let's find it together! Please recheck the ID and give it another shot." }
            return replies
        } catch (error) {
            console.log(`#createComment: Error: ${error.message}`)
            return { error: `#createComment: Error: ${error.message}` }
        }
    },

    getAReply: async (replyId) => {
        try {
            const reply = await db.Replies.findOne({
                where: { id: replyId }
            })
            if (!reply) return { message: "Oops, it seems like the comment you're after has gone on a little adventure. Let's find it together! Please recheck the ID and give it another shot." }
            return reply
        } catch (error) {
            console.log(`#createComment: Error: ${error.message}`)
            return { error: `#createComment: Error: ${error.message}` }
        }
    },
}