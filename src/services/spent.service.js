import Spent from '../models/Spent.js'

const createSpentService = (body) => Spent.create(body)

const findAllSpentsService = (offset, limit) => Spent.find().sort({ _id: -1 }).skip(offset).limit(limit).populate("user")

const countSpents = () => Spent.countDocuments()

const findSpentsByIdService = (id) => Spent.findById(id).populate("user")

const deleteByIdService = (id) => Spent.findByIdAndDelete(id)

const updateService = (id, date, description, category, spentValue, creditCard) => Spent.findOneAndUpdate({ _id: id }, { id, date, description, category, spentValue, creditCard })

const searchByDescriptionService = (description) => Spent.find({
  description: { $regex: `${description || ''}`, $options: 'i' }
}).sort({ _id: -1 }).populate("user")

const findByUserService = (id) => Spent.find({ user: id }).sort({ _id: -1 }).populate("user")

export default {
  countSpents,
  createSpentService,
  deleteByIdService,
  updateService,
  findAllSpentsService,
  findSpentsByIdService,
  searchByDescriptionService,
  findByUserService
}