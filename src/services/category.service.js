import Category from '../models/Categories.js'

const createCategoryService = (body) => Category.create(body)

const findAllCategoriesService = () => Category.find()

const findCategorysByIdService = (id) => Category.findById(id)

const deleteCategoryByIdService = (id) => Category.findByIdAndDelete(id)

const updateCategoryService = (id, name, subCategory) => Category.findOneAndUpdate({ _id: id }, { id, name, subCategory })

const searchByDescriptionService = (description) => Category.find({
  description: { $regex: `${description || ''}`, $options: 'i' }
}).sort({ _id: -1 }).populate("user")

export default {
  createCategoryService,
  findAllCategoriesService,
  findCategorysByIdService,
  deleteCategoryByIdService,
  updateCategoryService
}