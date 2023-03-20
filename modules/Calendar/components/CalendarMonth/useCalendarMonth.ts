import { useState } from 'react'

import { IDay } from '../CalendarDay/CalendarDay.type'

import CalendarDay from '../CalendarDay/CalendarDay.class'
import CalendarWeek from '../CalendarWeek/CalendarWeek.class'
import CalendarMonth from './CalendarMonth.class'

interface IUseCalendarMonthResponse {
  monthName: string
  year: number
  todayDay: IDay
  monthIndex: number
  monthDays: IDay[]
  weekNames: string[]
  prevMonth: () => void
  nextMonth: () => void
}

export function useCalendarMonth(date: Date, today: Date, locale: string): IUseCalendarMonthResponse {
  const todayDay = new CalendarDay({ date: today, locale }).getDay()
  const weekInst = new CalendarWeek({ locale: locale })
  const monthInst = new CalendarMonth({ date: date, locale: locale })
  const weekNames = weekInst.getWeekNames()

  const [monthDays, setMonthDays] = useState<IDay[]>(monthInst.getMonthDaysFullView())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [monthName, setMonthName] = useState<string>(monthInst.monthName)
  const [year, setYear] = useState<number>(date.getFullYear())

  function prevMonth() {
    if (monthIndex === 0) {
      const prevYear = year - 1
      const monthInst = new CalendarMonth({ date: new Date(prevYear, 11, 1), locale })
      setYear(prevYear)
      setMonthName(monthInst.monthName)
      setMonthIndex(11)
      setMonthDays(monthInst.getMonthDaysFullView())
      return
    }
    const prevMonth = monthIndex - 1
    const monthInst = new CalendarMonth({ date: new Date(year, prevMonth, 1), locale })
    setMonthName(monthInst.monthName)
    setMonthIndex(prevMonth)
    setMonthDays(monthInst.getMonthDaysFullView())
  }

  function nextMonth() {
    if (monthIndex > 10) {
      const nextYear = year + 1
      const monthInst = new CalendarMonth({ date: new Date(nextYear, 0, 1), locale })
      setYear(nextYear)
      setMonthName(monthInst.monthName)
      setMonthIndex(0)
      setMonthDays(monthInst.getMonthDaysFullView())
      return
    }
    const nextMonth = monthIndex + 1
    const monthInst = new CalendarMonth({ date: new Date(year, nextMonth, 1), locale })
    setMonthName(monthInst.monthName)
    setMonthIndex(nextMonth)
    setMonthDays(monthInst.getMonthDaysFullView())
  }

  return {
    monthName,
    year,
    monthIndex,
    todayDay,
    monthDays,
    weekNames,
    prevMonth,
    nextMonth,
  }
}
