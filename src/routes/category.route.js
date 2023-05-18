import { Router } from 'express'
import CategoryController from '../controllers/category.controller.js'
import { validId, validCategory, isDuplicatedCategory } from '../middlewares/category.middlewares.js'

const route = Router()

route.post("/", isDuplicatedCategory, CategoryController.createCategory);
route.get("/", CategoryController.findAllCategories);
route.patch("/:id", validId, validCategory, CategoryController.updateCategoryById);
route.delete("/:id", validId, validCategory, CategoryController.deleteCategoryById);

export default route;
