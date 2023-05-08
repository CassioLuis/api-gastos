export const convertDateStringToUTCDate = (param) => {
  return new Date(Date.UTC(
    Number(param.substring(0, 4)),
    Number(param.substring(5, 7)) - 1,
    Number(param.substring(8, 10)),
    12, // hora do dia em UTC (meio-dia)
    0, // minutos em UTC
    0 // segundos em UTC
  ))
}

export const convertDateToStringDate = (param) => {
  const newStringDate = convertDateStringToUTCDate(param)
  const dateStringFormat = { month: 'short', day: 'numeric' }
  const presentationDateToString = newStringDate.toLocaleDateString('pt-BR', dateStringFormat)
  const regex = /(\d{1,2}) de (\w+)/i;
  const [_, day, month] = regex.exec(presentationDateToString);
  return `${day} ${month.toUpperCase()}.`
}
