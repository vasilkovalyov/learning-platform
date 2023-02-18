export default function generateYears(startYear = 1960, endYear = new Date().getFullYear()): number[] {
  const years = []
  startYear = startYear || 1980
  while (startYear <= endYear) {
    years.push(startYear++)
  }
  return years
}
