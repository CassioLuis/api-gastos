import { convertDateStringToUTCDate, convertDateToStringDate } from '../utils/handling.dates.js'

export const createNextSpentsByQuotas = (param) => {
  const quantityOfParc = parseInt(param.quota)
  const date = convertDateStringToUTCDate(param.date)
  let month = date.getMonth() - 1;
  const newArrPayload = []
  for (let i = 1; i <= quantityOfParc; i++) {
    month += 1;
    const newDate = new Date(date.getFullYear(), month, 1);
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