module.exports = (sequelize, DataTypes) => {
    const books = sequelize.define('books', {
        text: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return books; 
}