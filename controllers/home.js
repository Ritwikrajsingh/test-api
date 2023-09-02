////don't call same article on readnext --> (handled sucessfully)

const db = require("../database/models");
const { Op } = require("sequelize");
const { sequelize } = require("../database/models");

module.exports = {
  getBlogs: async (req, res) => {
    try {
      console.log(req.body);
      // pagination
      let perPage = parseInt(req.query.perPage) || 6;
      let pageNo = parseInt(req.query.pageNo) || 1;
      let currentBanner = req.query.currentBanner

      //total pages
      let totalPosts = await db.Blogs.findAll();
      totalPosts = totalPosts.length - 1;
      let totalPages = [];

      // Math.ceil() adds the fraction value to the next integer value
      for (let i = 1; i <= Math.ceil(totalPosts / perPage); i++) {
        totalPages.push(i);
      }

      // if requested pageNo > totalPages
      if (pageNo > totalPages.length) {
        pageNo = totalPages.length;
      }

      // offest
      let offset = perPage * (pageNo - 1);

      console.log(currentBanner);

      // if requested page is > 1 i.e next page called
      if (parseInt(pageNo) > 1) {
        if (currentBanner && currentBanner !== ""){
          let blogs = await db.Blogs.findAll({
            offset,
            limit: perPage,
            where: {id: {[Op.ne]: currentBanner}},
            attributes: ["id", "title", "bannerImg"],
          });

          let response = {blogs, totalPages};
          return res.status(200).json(response);

        } else {
          throw new Error("currentBanner either not provided or invalid uuid!");
        }
      } else {

        // banner article
        const banner = await db.Blogs.findOne({
          order: sequelize.random(),
          attributes: ["id", "title", "subtitle", "bannerImg"],
        });

        // readnext articles
        let articles = await db.Blogs.findAll({
          offset, limit: perPage,
          where: { id: { [Op.ne]: banner.id } },
          attributes: ["id", "title", "bannerImg"],
        });

        let response = {banner, blogs: articles, totalPages};
        return res.status(200).json(response);
      }
    } catch (err) {
      return res.status(400).send(`${err}`);
    }
  },
};

/*
LET response = {emptyObject}

IF pageNo > 1:
    response = {
        articles,
        totalPages
    }
    return response

ELSE:
    response = {
        banner,
        articles,
        totalPages
    }
    return response
*/