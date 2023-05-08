import { convertDateStringToUTCDate, convertDateToStringDate } from '../utils/handling.dates.js'

export const createNextSpentsForQuotas = (param) => {
  const quantityOfParc = parseInt(param.quota)
  const date = convertDateStringToUTCDate(param.date)
  let month = date.getMonth();
  const newArrPayload = []
  for (let i = 1; i <= quantityOfParc; i++) {
    const nextMonth = date.setMonth(month + i - 1)
    const newDate = new Date(nextMonth)
    const converted = newDate.toISOString().substring(0, 10)
    const newPayload = {
      ...param,
      date: converted,
      presentationQuota: `${i}/${quantityOfParc}`,
      presentationDate: convertDateToStringDate(converted)
    }
    newArrPayload.push(newPayload)
  }
  return newArrPayload
}