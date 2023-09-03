module.exports = (sequelize, DataTypes) => {
  const Blogs = sequelize.define(
    "Blogs",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    }
  );

  Blogs.associate = function (models) {
    models.Blogs.hasMany(models.Comments, { foreignKey: "BlogId" });
  };

  return Blogs;
};
