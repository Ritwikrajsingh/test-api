module.exports = (sequelize, DataTypes) => {
  const Replies = sequelize.define("Replies", {
    reply: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, {
    freezeTableName: true,
  });

  Replies.associate = function (models) {
    Replies.belongsTo(models.Comments, { foreignKey: "CommentId" });
  };

  return Replies;
};