import SpentService from '../services/spent.service.js'

const create = async (req, res) => {
  try {
    const payload = req.body

    if (!payload.length) {
      const spent = await SpentService.createSpentService(payload)
      if (!spent) return res.status(400).send({ message: "Error creating spent" })
    }
    else {
      payload.forEach(async (spent) => await SpentService.createSpentService(spent))
    }
    res.status(201).send({ message: "Spent created succesfully", payload })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findAllSpents = async (req, res) => {
  try {
    const spent = await SpentService.findAllSpentsService()
    if (spent.length === 0) return res.status(400).send({ message: "Não há despesas cadastradas" })
    res.send(spent)
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const deleteById = async (req, res) => {
  try {
    const id = req.params.id
    await SpentService.deleteByIdService(id)
    res.send({ deletedSpent: id })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const updateById = async (req, res) => {
  try {
    const { date, description, category, spentValue, creditCard, quota } = req.body
    if (!date && !description && !category && !spentValue && !creditCard && !quota) return res.status(400).send({ message: 'Submit at least one field for update' })
    const { id } = req.params
    await SpentService.updateService(id, date, description, category, spentValue, creditCard)
    res.send({ message: 'User successfully updated' })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export default { create, findAllSpents, deleteById, updateById }