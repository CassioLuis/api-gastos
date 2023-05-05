// const express = require('express')
import express from 'express'
import UserController from '../controllers/user.controller.js'
import GlobalMiddlewares from '../middlewares/global.middlewares.js'

const route = express.Router()

route.post("/", UserController.create);
route.get("/", UserController.findAllUsers);
route.get("/:id", GlobalMiddlewares.validId, GlobalMiddlewares.validUser, UserController.findUserById);
route.patch("/:id", GlobalMiddlewares.validId, GlobalMiddlewares.validUser, UserController.updateById);

export default route;
