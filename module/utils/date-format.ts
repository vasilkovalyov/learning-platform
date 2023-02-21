export function getDateFormat(dateStr: string) {
  const monthes = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const date = new Date(dateStr)

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  return `${day} ${monthes[month]} ${year}`
}
