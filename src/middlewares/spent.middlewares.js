import mongoose from 'mongoose'
import SpentService from '../services/spent.service.js'
import { convertDateToStringDate } from '../utils/handling.dates.js'
import { createNextSpentsByQuotas } from '../utils/handling.quotas.js'

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
    if (!req.body.quota) return next()
    req.body = createNextSpentsByQuotas(req.body)
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

export const validateRequest = (req, res, next) => {
  try {
    const { date, description, category, spentValue } = req.body
    if (!date || !description || !category || !spentValue ) {
      return res.status(400).send({ message: 'Existe algum campo invalido' })
    }
    next()
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}