// const express = require('express')
import express from 'express'
import UserController from '../controllers/user.controller.js'
import {validId, validUser} from '../middlewares/user.middlewares.js'

const route = express.Router()

route.post("/", UserController.create);
route.get("/", UserController.findAllUsers);
route.get("/:id", validId, validUser, UserController.findUserById);
route.patch("/:id", validId, validUser, UserController.updateById);

export default route;
