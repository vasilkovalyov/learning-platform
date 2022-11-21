import CalendarDate from './CalendarDate'

class CalendarWeek {
  getWeekNumber(date: Date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysYear + firstDayOfYear.getDay() + 1) / 7)
  }

  getWeekDaysNames(firstWeekDay = 2, locale = 'en-En') {
    const weekDaysNames: {
      day: ReturnType<typeof this.createDate>['day']
      dayShort: ReturnType<typeof this.createDate>['dayShort']
    }[] = Array.from({ length: 7 })

    const date = new Date()

    weekDaysNames.forEach((_, i) => {
      const { day, dayNumberInWeek, dayShort } = new CalendarDate().createDate({
        locale: locale || 'en-En',
        date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
      })
      weekDaysNames[dayNumberInWeek - 1] = { day, dayShort }
    })
    return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)]
  }
}

export default CalendarWeek
