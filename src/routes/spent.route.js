import express from 'express'
import SpentController from '../controllers/spent.controller.js'
import { createNewProperty, createSpentsQuotas, validId, validSpent } from '../middlewares/spent.middlewares.js'

const route = express.Router()

route.post("/", createNewProperty, createSpentsQuotas, SpentController.create);
route.get("/", SpentController.findAllSpents);
route.delete("/:id", validId, validSpent, SpentController.deleteById);
route.patch("/:id", validId, validSpent, SpentController.updateById);

export default route;
