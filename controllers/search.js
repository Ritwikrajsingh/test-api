const {Op} = require('sequelize')
const db = require("../database/models");

module.exports = {
    searchBlogs: async (req, res) => {
        try {
            // if param is not passed
            if(!req.query.keyword) {
                return res.status(400).json({ message: 'keyword parameter is missing' });
            }

            const keyword = req.query.keyword;
            const results = await db.Blogs.findAll({
                where: {[Op.or] : {tags: {[Op.iLike]: `%${keyword}%`}, title: {[Op.iLike] : `%${keyword}%`}}},
                attributes: ["id", "title"]
            })

            if (results.length === 0) {
                return res.status(404).json({title: 'No match found!'})
            }
            res.status(200).json(results);

        } catch (err){
            res.status(500).json({message: `Error Searchin: ${err}`})
        }
    }
}