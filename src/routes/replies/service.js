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
}