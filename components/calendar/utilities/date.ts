export function formatDate(date: Date, format: string, locale = 'en-En') {
  return format
    .replace(/\bYYYY\b/, date.getFullYear().toString())
    .replace(/\bMM\b/, date.getMonth().toString().padStart(2, '0'))
    .replace(/\bMMMM\b/, date.toLocaleDateString(locale, { weekday: 'long' }))
    .replace(/\bDD\b/, date.getDate().toString().padStart(2, '0'))
}
