const getDate = (raw) => {
  if (!raw) {
    return 'No Date'
  }
  const date = new Date(raw)
  const month = date.toLocaleString('en', { month: 'long' })
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export default getDate
