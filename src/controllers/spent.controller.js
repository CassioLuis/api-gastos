import SpentService from '../services/spent.service.js'

const createSpent = async (req, res) => {
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
    // let { limit, offset } = req.query

    // limit = Number(limit)
    // offset = Number(offset)

    // if (!limit) {
    //   limit = 5
    // }
    // if (!offset) {
    //   offset = 0
    // }
    const spent = await SpentService.findAllSpentsService()

    // const spentTotal = await SpentService.countSpents()
    // const currentUrl = req.baseUrl
    // const next = offset + limit
    // const nextUrl = next < spentTotal ? `${currentUrl}?limit=${limit}&offset=${next}` : null
    // const previous = offset - limit < 0 ? null : offset - limit
    // const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null

    if (spent.length === 0) return
    //res.status(400).send({ message: "Não há despesas cadastradas" })

    res.send(spent)
    // res.send({
    //   nextUrl,
    //   previousUrl,
    //   limit,
    //   offset,
    //   spentTotal,
    //   results: spent.map(
    //     ({ _id: id, date, description, category, spentValue, creditCard, presentationDate, presentationQuota,
    //       // user: { _id: userid, name, email }
    //       }
    //     ) => ({
    //       id,
    //       date,
    //       description,
    //       category,
    //       spentValue,
    //       creditCard,
    //       presentationDate,
    //       presentationQuota,
    //       // userid,
    //       // name,
    //       // email
    //     }))
    // })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const deleteById = async (req, res) => {
  try {
    const spentId = req.params.id
    const spent = await SpentService.findSpentsByIdService(spentId)
    // if (req.body.user !== spent.user.id) return res.status(400).send({ message: "Somente o usuario que criou pode deletar" })
    if (spent.uniqueForQuotas) {
      const allSpents = await SpentService.findAllSpentsService()
      const quotaSpentsToDelete = allSpents.filter(item => item.uniqueForQuotas === spent.uniqueForQuotas)
      quotaSpentsToDelete.forEach(async item => await SpentService.deleteByIdService(item._id))
      res.send({ deletedSpent: quotaSpentsToDelete })
    } else {
      await SpentService.deleteByIdService(spentId)
      res.send({ deletedSpent: spentId })
    }
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
    const spent = await SpentService.findSpentsByIdService(id)
    // if (req.body.user !== spent.user.id) return res.status(400).send({ message: "Somente o usuario que criou pode alterar" })
    await SpentService.updateService(id, date, description, category, spentValue, creditCard)
    res.send({ message: 'Spent successfully updated' })
  }
  catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const searchByDescription = async (req, res) => {
  try {
    const { description } = req.query
    const spents = await SpentService.searchByDescriptionService(description)
    if (!spents.length) return res.status(400).send({ message: "Não há nenhuma despesa com essa descrição" })

    res.send({
      results: spents.map(
        ({ _id: id, date, description, category, spentValue, creditCard, presentationDate, presentationQuota, user: { _id: userid, name } }) => ({
          id,
          date,
          description,
          category,
          spentValue,
          creditCard,
          presentationDate,
          presentationQuota,
          userid,
          name
        }))
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

const findByUser = async (req, res) => {
  try {
    const id = req.body.user
    const spents = await SpentService.findByUserService(id)
    if (!spents.length) return res.status(400).send({ message: "Não há nenhuma despesa para esse usuario" })

    res.send({
      results: spents.map(
        ({ _id: id, date, description, category, spentValue, creditCard, presentationDate, presentationQuota, user: { _id: userid, name } }) => ({
          id,
          date,
          description,
          category,
          spentValue,
          creditCard,
          presentationDate,
          presentationQuota,
          userid,
          name
        }))
    })
  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}
export default { createSpent, findAllSpents, deleteById, updateById, searchByDescription, findByUser }