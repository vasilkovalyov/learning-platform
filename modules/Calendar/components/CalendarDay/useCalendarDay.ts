import { useState } from 'react'

import { IDay } from '../CalendarDay/CalendarDay.type'

import CalendarDay from './CalendarDay.class'
import CalendarMonth from '../CalendarMonth/CalendarMonth.class'

interface IUseCalendarDayResponse {
  day: IDay
  year: number
  prevDay: () => void
  nextDay: () => void
  getCurrentMonthName: () => string
}

export function useCalendarDay(date: Date, locale: string): IUseCalendarDayResponse {
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [year, setYear] = useState<number>(date.getFullYear())
  const [day, setDay] = useState<IDay>(new CalendarDay({ date: date, locale }).getDay())

  function prevDay() {
    if (day.dayNumber <= 1) {
      if (monthIndex === 0) {
        const prevYear = year - 1
        const prevMonthDay = new CalendarDay({ date: new Date(prevYear, 12, 0) }).getDay()
        setYear(prevYear)
        setMonthIndex(11)
        setDay(prevMonthDay)
      } else {
        const prevMonth = monthIndex - 1
        const prevMonthDay = new CalendarDay({ date: new Date(year, monthIndex, 0) }).getDay()
        setDay(prevMonthDay)
        setMonthIndex(prevMonth)
      }
    } else {
      const prevDay = new CalendarDay({ date: new Date(year, monthIndex, day.dayNumber - 1) }).getDay()
      setDay(prevDay)
    }
  }

  function nextDay() {
    if (day.dayNumber >= new Date(year, monthIndex + 1, 0).getDate()) {
      if (monthIndex === 11) {
        const nextYear = year + 1
        const nextMonthDay = new CalendarDay({ date: new Date(nextYear, 0, 1) }).getDay()
        setYear(nextYear)
        setMonthIndex(0)
        setDay(nextMonthDay)
      } else {
        const nextMonth = monthIndex + 1
        const nextMonthDay = new CalendarDay({ date: new Date(year, nextMonth, 1) }).getDay()
        setMonthIndex(nextMonth)
        setDay(nextMonthDay)
      }
    } else {
      const nextDay = new CalendarDay({ date: new Date(year, monthIndex, day.dayNumber + 1) }).getDay()
      setDay(nextDay)
    }
  }

  function getCurrentMonthName() {
    return CalendarMonth.getMonthNameByIndex(monthIndex).month
  }

  return {
    day,
    year,
    prevDay,
    nextDay,
    getCurrentMonthName,
  }
}
