module.exports = (sequelize, DataTypes) => {
  const Replies = sequelize.define("Replies", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    reply: {
      type: DataTypes.STRING
    },
  }, {
    freezeTableName: true,
  });

  Replies.associate = function (models) {
    Replies.belongsTo(models.Comments, { foreignKey: "CommentId" });
  };

  return Replies;
};