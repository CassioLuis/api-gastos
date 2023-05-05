const User = require('../models/User')

const createService = (body) => User.create(body)
const findAllUsersService = () => User.find()
const findUserByIdService = (id) => User.findById(id)
const updateService = (id, name, username, email, password) => User.findOneAndUpdate({ _id: id }, { id, name, username, email, password })

module.exports = {
  createService,
  findAllUsersService,
  findUserByIdService,
  updateService
}