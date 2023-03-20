import { useState } from 'react'
import { weekDaysCount } from '../../constants'
import CalendarDay from '../CalendarDay/CalendarDay.class'
import { IDay } from '../CalendarDay/CalendarDay.type'
import CalendarWeek from '../CalendarWeek/CalendarWeek.class'

interface IUseCalendarScheduleWeekResponse {
  week: IDay[]
  weekNames: string[]
  prevWeek: () => void
  nextWeek: () => void
}

export function useCalendarScheduleWeek(date: Date, locale: string): IUseCalendarScheduleWeekResponse {
  const weekNames = new CalendarWeek({ locale }).getWeekNames()

  const [week, setWeek] = useState<IDay[]>(CalendarWeek.getWeekDayByDate(new Date()))
  const [year, setYear] = useState<number>(date.getFullYear())
  const [monthIndex, setMonthIndex] = useState<number>(date.getMonth())
  const [day, setDay] = useState<IDay>(new CalendarDay({ date: date, locale }).getDay())

  function togglerWeeks(weekDay: Date) {
    const prevWeekDays = CalendarWeek.getWeekDayByDate(weekDay)
    const fDayWeek = prevWeekDays[0]
    setDay(fDayWeek)
    setYear(fDayWeek.year)
    setMonthIndex(fDayWeek.monthIndex)
    setWeek(CalendarWeek.getWeekDayByDate(weekDay))
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
    week,
    weekNames,
    prevWeek,
    nextWeek,
  }
}
