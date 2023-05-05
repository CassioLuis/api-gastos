const userService = require('../services/user.service')

const create = async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    if (!name || !username || !email || !password) return res.status(400).send({ message: 'Existe algum campo invalido' })

    const user = await userService.createService(req.body)

    if (!user) return res.status(400).send({ message: "Error creating user" })

    res.status(201).send({
      message: "User created succesfully",
      user: {
        id: user._id,
        name,
        username,
        email,
        password
      }
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsersService()
    if (users.length === 0) return res.status(400).send({ message: "Não há usuarios cadastrados" })
    res.send(users)
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findUserById = async (req, res) => {
  try {
    const user = req.user
    res.send(user)
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const updateById = async (req, res) => {
  try {
    const { name, username, email, password } = req.body
    if (!name && !username && !email && !password) return res.status(400).send({ message: 'Submit at least one field for update' })
    const { id, user } = req
    await userService.updateService(id, name, username, email, password)
    res.send({ message: 'User successfully updated' })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

module.exports = { create, findAllUsers, findUserById, updateById }