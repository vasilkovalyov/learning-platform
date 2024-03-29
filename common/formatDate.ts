export function formatDate(date: Date, format: string, locale = 'en-En'): string {
  return format
    .replace(/\bYYYY\b/, date.getFullYear().toString())
    .replace(/\bMM\b/, date.getMonth().toString().padStart(2, '0'))
    .replace(/\bMMM\b/, date.toLocaleDateString(locale, { month: 'short' }))
    .replace(/\bMMMM\b/, date.toLocaleDateString(locale, { month: 'long' }))
    .replace(/\bDD\b/, date.getDate().toString().padStart(2, '0'))
}
