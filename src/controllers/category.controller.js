import CategoryService from '../services/category.service.js'

const createCategory = async (req, res) => {
  try {
    const { name, subCategory } = req.body
    if (!name) return res.status(400).send({ message: 'Existe algum campo invalido' })
    
    const category = await CategoryService.createCategoryService(req.body)

    if (!category) return res.status(400).send({ message: "Error creating user" })

    res.status(201).send({
      message: "Category created succesfully",
      category: {
        id: category._id,
        name,
        subCategory
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findAllCategories = async (req, res) => {
  try {
    const categories = await CategoryService.findAllCategoriesService()
    if (categories.length === 0) return
    res.send(categories)
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const updateCategoryById = async (req, res) => {
  try {
    const { name, subCategory } = req.body
    if (!name && !subCategory) return res.status(400).send({ message: 'Submit at least one field for update' })
    const { id } = req.params
    await CategoryService.updateCategoryService(id, name, subCategory)
    res.send({ message: 'Category successfully updated' })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const deleteCategoryById = async (req, res) => {
  try {
    const id = req.params.id
    const category = await CategoryService.findCategorysByIdService(id)
    // if (req.body.user !== spent.user.id) return res.status(400).send({ message: "Somente o usuario que criou pode deletar" })
    await CategoryService.deleteCategoryByIdService(id)
    res.send({ deletedCategory: id })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export default { createCategory, findAllCategories, updateCategoryById, deleteCategoryById }