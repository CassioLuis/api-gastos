import mongoose from 'mongoose'
import CategoryService from '../services/category.service.js'
import { removeAccent } from '../utils/removeAccent.js'

export const validId = (req, res, next) => {
  try {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).send({ message: 'Invalid ID' })
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const validCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    const category = await CategoryService.findCategorysByIdService(id)
    if (!category) return res.status(400).send({ message: "Category not found" })
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const isDuplicatedCategory = async (req, res, next) => {
  try {
    const { name } = req.body
    const categories = await CategoryService.findAllCategoriesService()
    const cleanedCategories = categories.map(item => removeAccent(item.name.toLowerCase()))
    const cleanedName = removeAccent(name.toLowerCase())
    if (cleanedCategories.includes(cleanedName)) return res.status(400).send({ message: "Category duplicated" })
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}