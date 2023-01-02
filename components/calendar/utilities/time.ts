export function getCurrentTime(date: Date): string {
  return (
    (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
  )
}
