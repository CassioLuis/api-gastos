import Spent from '../models/Spent.js'

const createSpentService = (body) => Spent.create(body)
const findAllSpentsService = () => Spent.find()
const findSpentsByIdService = (id) => Spent.findById(id)
const deleteByIdService = (id) => Spent.findOneAndDelete(id)
const updateService = (id, date, description, category, spentValue, creditCard) => Spent.findOneAndUpdate({ _id: id }, { id, date, description, category, spentValue, creditCard })

export default {
  createSpentService,
  deleteByIdService,
  updateService,
  findAllSpentsService,
  findSpentsByIdService
}