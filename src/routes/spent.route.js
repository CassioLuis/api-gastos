import { Router } from 'express'
import SpentController from '../controllers/spent.controller.js'
import { createNewProperty, createSpentsQuotas, validId, validSpent, validateRequest } from '../middlewares/spent.middlewares.js'
import { authMiddleware } from '../middlewares/auth.middlewares.js';

const route = Router()

route.post("/", validateRequest, createNewProperty, createSpentsQuotas, SpentController.createSpent);
route.get("/", SpentController.findAllSpents);
route.get("/search", authMiddleware, SpentController.searchByDescription);
route.get("/byUser", authMiddleware, SpentController.findByUser);
route.delete("/:id", authMiddleware, validId, validSpent, SpentController.deleteById);
route.patch("/:id", authMiddleware, validId, validSpent, SpentController.updateById);

export default route;
