const {Router} = require("express");
const login = require("../controllers/login");



const mainRouter = Router();


mainRouter.get("/login", login);


module.exports = mainRouter;
