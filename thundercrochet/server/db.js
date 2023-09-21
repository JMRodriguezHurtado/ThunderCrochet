
const { Sequelize } = require("sequelize");


const sequelize = new Sequelize(`postgres://postgres:Xuenyo55280775@localhost:5432/thundercrotchet`);

module.exports = sequelize;