const db = require("../../database/models/");

module.exports = {
    createComment: async (blogId, comment) => {
        try {
            const newComment = await db.Comments.create({ BlogId: blogId, comment });
            return newComment
        } catch (error) {
            console.log(`#createComment: Error: ${error.message}`)
            return { error: `#createComment: Error: ${error.message}` }
        }
    },

    getComments: async (blogId) => {
        try {
            const comments = await db.Comments.findAll({
                where: { BlogId: blogId },
                include: {
                    model: db.Replies,
                }
            });
            if (!comments.length) return { message: "Oops, it seems like the blog you're after has gone on a little adventure. Let's find it together! Please recheck the ID and give it another shot." }

            return comments
        } catch (error) {
            console.log(`#createComment: Error: ${error.message}`)
            return { error: `#createComment: Error: ${error.message}` }
        }
    },

    getAComment: async (id) => {
        try {
            const comment = await db.Comments.findOne({
                where: { id },
                include: {
                    model: db.Replies,
                }
            });
            if (!comment) return { message: "Oops, it seems like the comment you're after has gone on a little adventure. Let's find it together! Please recheck the ID and give it another shot." }

            return comment
        } catch (error) {
            console.log(`#createComment: Error: ${error.message}`)
            return { error: `#createComment: Error: ${error.message}` }
        }
    },
}