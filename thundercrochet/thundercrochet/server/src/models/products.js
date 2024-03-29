const  {DataTypes}  = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Products",{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true, 
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      sale:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      category:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      img:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
       quantity: {
         type: DataTypes.INTEGER,
        allowNull: false,
       },
    },
    {paranoid: true}
  );
};