import Category from '../models/Categories.js'

const createCategoryService = (body) => Category.create(body)

const findAllCategoriesService = () => Category.find()

const findCategorysByIdService = (id) => Category.findById(id)

const deleteCategoryByIdService = (id) => Category.findByIdAndDelete(id)

const updateCategoryService = (id, name, subCategory) => Category.findOneAndUpdate({ _id: id }, { id, name, subCategory })

export default {
  createCategoryService,
  findAllCategoriesService,
  findCategorysByIdService,
  deleteCategoryByIdService,
  updateCategoryService
}