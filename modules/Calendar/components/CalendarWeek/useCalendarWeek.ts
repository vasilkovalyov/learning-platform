import { useState } from 'react'
import { IDay } from '../CalendarDay/CalendarDay.type'

import CalendarWeek from './CalendarWeek.class'
import CalendarMonth from '../CalendarMonth/CalendarMonth.class'
import CalendarDay from '../CalendarDay/CalendarDay.class'

import { weekDaysCount } from '../../constants'

interface IUseCalendarWeekResponse {
  day: IDay
  todayDay: IDay
  weekNames: string[]
  week: IDay[]
  prevWeek: () => void
  nextWeek: () => void
  getCurrentMonthName: () => string
}

export function useCalendarWeek(date: Date, today: Date, locale: string): IUseCalendarWeekResponse {
  const todayDay = new CalendarDay({ date: today, locale }).getDay()
  const weekInst = new CalendarWeek()
  const weekNames = weekInst.getWeekNames()

  const [year, setYear] = useState<number>(date.getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [week, setWeek] = useState<IDay[]>(CalendarWeek.getWeekDayByDate(new Date()))
  const [day, setDay] = useState<IDay>(new CalendarDay({ date: date, locale }).getDay())

  function togglerWeeks(weekDay: Date) {
    const prevWeekDays = CalendarWeek.getWeekDayByDate(weekDay)
    const fDayWeek = prevWeekDays[0]
    setDay(fDayWeek)
    setYear(fDayWeek.year)
    setMonthIndex(fDayWeek.monthIndex)
    setWeek(prevWeekDays)
  }

  function getCurrentMonthName() {
    return CalendarMonth.getMonthNameByIndex(day.monthIndex).month
  }

  function prevWeek() {
    const prevWeekDay = new Date(year, monthIndex, day.date.getDate() - weekDaysCount)
    togglerWeeks(prevWeekDay)
  }

  function nextWeek() {
    const nextWeekDay = new Date(year, monthIndex, day.date.getDate() + weekDaysCount)
    togglerWeeks(nextWeekDay)
  }
  return {
    day,
    todayDay,
    weekNames,
    week,
    getCurrentMonthName,
    prevWeek,
    nextWeek,
  }
}
