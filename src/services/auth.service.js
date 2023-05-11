import User from '../models/User.js'
import Jwt from 'jsonwebtoken'

export const loginService = (email) => User.findOne({ email: email }).select("+password")
export const generateToken = (id) => Jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 })