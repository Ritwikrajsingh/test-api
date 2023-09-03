const db = require("../../database/models");

module.exports = {
    createBlog: async (title) => {
        try {
            const blog = await db.BLogs.create({ title })
            return blog
        } catch (error) {
            console.log(`#createBlog: Error: ${error.message}`)
            return { message: `#createBlog: Error: ${error.message}` }
        }
    }
}