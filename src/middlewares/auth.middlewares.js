import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import UserService from '../services/user.service.js'

dotenv.config()

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(401).send({ message: "User not connected" })

    const parts = authorization.split(' ')
    if (!parts.length === 2) return res.send(401)

    const [schema, token] = parts
    if (!schema === 'Bearer') return res.send(401)

    jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
      if (error) return res.status(401).send({ message: 'Invalid token' })

      const user = await UserService.findUserByIdService(decoded.id)
      if (!user || !user.id) return res.status(401).send({ message: 'User token invalid' })
      
      req.body = { ...req.body, user: user.id }
      return next()
    })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}