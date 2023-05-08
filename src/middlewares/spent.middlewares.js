import mongoose from 'mongoose'
import SpentService from '../services/spent.service.js'
import { convertDateToStringDate } from '../utils/handling.dates.js'
import { createNextSpentsForQuotas } from '../utils/handling.quotas.js'


export const createNewProperty = (req, res, next) => {
  try {
    const date = convertDateToStringDate(req.body.date)
    req.body = { ...req.body, presentationDate: date }
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

export const createSpentsQuotas = (req, res, next) => {
  try {
    const body = createNextSpentsForQuotas(req.body)
    console.log(body);
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

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

export const validSpent = async (req, res, next) => {
  try {
    const id = req.params.id
    const spent = await SpentService.findSpentsByIdService(id)
    if (!spent) return res.status(400).send({ message: "Spent not found" })
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

// const validUser = async (req, res, next) => {
//   try {
//     const id = req.params.id
//     const user = await UserService.findUserByIdService(id)
//     if (!user) return res.status(400).send({ message: "User not found" })
//     req.id = id
//     req.user = user
//     next()
//   }
//   catch (err) {
//     res.status(500).send({ message: err.message })
//   }
// }