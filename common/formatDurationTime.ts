export default function getFormatDurationTime(duration: number, timeStrType: 'short' | 'long' = 'short'): string {
  const hours = Math.floor(duration / 60)
  const minutes = duration % 60
  const hourStr = timeStrType === 'long' ? 'hour' : 'h'
  const minutesStr = timeStrType === 'long' ? 'minutes' : 'm'
  const timeStr = hours > 0 ? hourStr : minutesStr

  return `${hours}${minutes ? ':' + minutes : ''} ${timeStr}`
}
