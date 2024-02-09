const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "Reviews",
    {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    review: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {paranoid: true}
)
}