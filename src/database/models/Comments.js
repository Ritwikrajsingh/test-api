module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        comment: {
            type: DataTypes.STRING(80),
            allowNull: false,
        }
    }, {
        tableName: 'Comments',
        freezeTableName: true,
    })

    Comments.associate = function (models) {
        models.Comments.belongsTo(models.Blogs, { foreignKey: "BlogId" })

    };

    Comments.associate = function (models) {
        models.Comments.hasMany(models.Replies, { foreignKey: "CommentId" })

    };

    return Comments;
};