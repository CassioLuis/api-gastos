import { Router } from 'express'
import SpentController from '../controllers/spent.controller.js'
import { createNewProperty, createSpentsQuotas, validId, validSpent, validateRequest } from '../middlewares/spent.middlewares.js'

const route = Router()

route.post("/", validateRequest, createNewProperty, createSpentsQuotas, SpentController.create);
route.get("/", SpentController.findAllSpents);
route.delete("/:id", validId, validSpent, SpentController.deleteById);
route.patch("/:id", validId, validSpent, SpentController.updateById);

export default route;
