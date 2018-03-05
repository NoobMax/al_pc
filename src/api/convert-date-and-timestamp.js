export const timestampToDate = timestamp => {
  let date = new Date(timestamp * 1000)
  let year = date.getFullYear()
  let month = '0' + date.getMonth() + 1
  let day = '0' + date.getDate()
  let hours = '0' + date.getHours()
  let minutes = '0' + date.getMinutes()
  let formattedTime = `${year}-${month.substr(-2)}-${day.substr(-2)} ${hours.substr(-2)}:${minutes.substr(-2)}`
  return formattedTime
}

export const DateToTimestamp = date => {
  if (date === null) {
    return null
  }
  date = date.split('-')
  let newDate = `${date[1]}/${date[2]}/${date[0]}`
  let timestamp = new Date(newDate).getTime()
  return (timestamp / 1000)
}
