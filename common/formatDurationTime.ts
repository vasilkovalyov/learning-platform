export default function getFormatDurationTime(duration: number): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  const timeStr = hours > 0 ? 'h' : 'm'

  return `${hours}${minutes ? ':' + minutes : ''} ${timeStr}`
}
