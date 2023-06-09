import User from '../models/User.js'

const createUserService = (body) => User.create(body)
const findAllUsersService = () => User.find()
const findUserByIdService = (id) => User.findById(id)
const updateService = (id, name, username, email, password) => User.findOneAndUpdate({ _id: id }, { id, name, username, email, password })

export default {
  createUserService,
  findAllUsersService,
  findUserByIdService,
  updateService
}