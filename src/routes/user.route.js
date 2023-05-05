const express = require('express')
const userController = require("../controllers/user.controller")
const { validId, validUser } = require("../middlewares/global.middlewares")

const route = express.Router()

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findUserById);
route.patch("/:id", validId, validUser, userController.updateById);

module.exports = route;
