import React, { useState, useEffect } from 'react'
import CalendarDate, { ICreateDate } from '../utilities/CalendarDate'
import CalendarDay from '../utilities/CalendarDay'
import CalendarMonth, { IMonth } from '../utilities/CalendarMonth'

export function useCalendar(
  currentDate: ICreateDate,
): [
  ICreateDate[],
  number,
  number,
  (days: ICreateDate[]) => void,
  () => void,
  () => void,
  (index: number) => IMonth,
  (string) => boolean,
] {
  const [days, setDays] = useState<ICreateDate[]>([])
  const [selectedMonth, setSelectedMonth] = useState(currentDate.monthIndex)
  const [selectedYear, setSelectedYear] = useState(currentDate.year)

  const calendarMonthInst = new CalendarMonth()
  const dayInst = new CalendarDay()
  const calendarDateInst = new CalendarDate()

  function nextMonth() {
    if (selectedMonth > 10) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
      setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear + 1, monthIndex: 0 }))
      return
    }
    setSelectedMonth(selectedMonth + 1)
    setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear, monthIndex: selectedMonth + 1 }))
  }

  function prevMonth() {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
      setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear - 1, monthIndex: 11 }))
      return
    }
    setSelectedMonth(selectedMonth - 1)
    setDays(calendarMonthInst.getTotalDaysInView({ year: selectedYear, monthIndex: selectedMonth - 1 }))
  }

  const getMonthByIndex = (index: number): IMonth => {
    let targetMonth!: IMonth
    for (let i = 0; i <= calendarMonthInst.getMonthesNames().length - 1; i++) {
      if (calendarMonthInst.getMonthesNames()[i].monthIndex === index) {
        targetMonth = calendarMonthInst.getMonthesNames()[i]
        break
      }
    }
    return targetMonth
  }

  const isWeekend = (day: string): boolean => day === 'Sunday' || day === 'Saturday'

  return [days, selectedMonth, selectedYear, setDays, nextMonth, prevMonth, getMonthByIndex, isWeekend]
}
