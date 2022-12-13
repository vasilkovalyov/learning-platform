import React, { useState, useEffect } from 'react'
import CalendarDate, { ICreateDate } from '../utilities/CalendarDate'
import CalendarDay from '../utilities/CalendarDay'
import CalendarMonth, { IMonth } from '../utilities/CalendarMonth'

export function useCalendar(
  date: ICreateDate,
): [
  ICreateDate,
  ICreateDate,
  ICreateDate[],
  number,
  number,
  (days: ICreateDate) => void,
  (days: ICreateDate[]) => void,
  () => void,
  () => void,
  () => void,
  () => void,
  () => void,
  () => void,
  (index: number) => IMonth,
  (string) => boolean,
] {
  const [days, setDays] = useState<ICreateDate[]>([])
  const [selectedMonth, setSelectedMonth] = useState<number>(date.monthIndex)
  const [selectedYear, setSelectedYear] = useState<number>(date.year)
  const [todayDate, setTodayDate] = useState<ICreateDate>(date)
  const [targetDate, setTargetDate] = useState<ICreateDate>(date)

  const calendarMonthInst = new CalendarMonth()
  const dayInst = new CalendarDay()
  const calendarDateInst = new CalendarDate()

  function nextDay() {
    // const targetDayNumber = targetDate.dayNumber
    // const monthDays = calendarMonthInst.getMonthDays(selectedYear, selectedMonth)
    // const monthDaysNumbers = monthDays.length

    // if (targetDayNumber > monthDaysNumbers) {
    //   if (selectedMonth > 10) {
    //     setSelectedMonth(0)
    //   } else {
    //     setSelectedMonth(selectedMonth + 1)
    //   }
    //   setTargetDate(monthDays[targetDayNumber])
    // } else {
    //   for (let i = 0; i < monthDays.length - 1; i++) {
    //     if (targetDate.dayNumber === monthDays[i].dayNumber) {
    //       setTargetDate(monthDays[i + 1])
    //       break
    //     }
    //   }
    // }

    const targetDayNumber = targetDate.dayNumber
    if (targetDayNumber >= calendarMonthInst.getMonthDays(selectedYear, selectedMonth).length) {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
        setSelectedYear(selectedYear + 1)
        const prevMonthYearDays = calendarMonthInst.getMonthDays(selectedYear + 1, selectedMonth + 1)
        setTargetDate(prevMonthYearDays[0])
      } else {
        setSelectedMonth(selectedMonth + 1)
        const prevMonthDays = calendarMonthInst.getMonthDays(selectedYear, selectedMonth + 1)
        setTargetDate(prevMonthDays[0])
      }
    } else {
      const monthDays = calendarMonthInst.getMonthDays(selectedYear, selectedMonth)
      for (let i = 0; i <= monthDays.length; i++) {
        if (targetDate.dayNumber === monthDays[i].dayNumber) {
          setTargetDate(monthDays[i + 1])
          break
        }
      }
    }
  }

  function prevDay() {
    const targetDayNumber = targetDate.dayNumber

    if (targetDayNumber <= 1) {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
        setSelectedYear(selectedYear - 1)
        const prevMonthYearDays = calendarMonthInst.getMonthDays(selectedYear - 1, selectedMonth - 1)
        setTargetDate(prevMonthYearDays[prevMonthYearDays.length - 1])
      } else {
        setSelectedMonth(selectedMonth - 1)
        const prevMonthDays = calendarMonthInst.getMonthDays(selectedYear, selectedMonth - 1)
        setTargetDate(prevMonthDays[prevMonthDays.length - 1])
      }
    } else {
      const monthDays = calendarMonthInst.getMonthDays(selectedYear, selectedMonth)
      for (let i = 0; i <= monthDays.length; i++) {
        if (targetDate.dayNumber === monthDays[i].dayNumber) {
          setTargetDate(monthDays[i - 1])
          break
        }
      }
    }
  }

  function nextWeek() {
    console.log('nextWeek')
  }

  function prevWeek() {
    console.log('prevWeek')
  }

  function nextMonth() {
    if (selectedMonth > 10) {
      setSelectedMonth(0)
      setSelectedYear(selectedYear + 1)
      setDays(calendarMonthInst.getTotalDaysInViewMonth({ year: selectedYear + 1, monthIndex: 0 }))
      return
    }
    setSelectedMonth(selectedMonth + 1)
    setDays(calendarMonthInst.getTotalDaysInViewMonth({ year: selectedYear, monthIndex: selectedMonth + 1 }))
  }

  function prevMonth() {
    if (selectedMonth === 0) {
      setSelectedMonth(11)
      setSelectedYear(selectedYear - 1)
      setDays(calendarMonthInst.getTotalDaysInViewMonth({ year: selectedYear - 1, monthIndex: 11 }))
      return
    }
    setSelectedMonth(selectedMonth - 1)
    setDays(calendarMonthInst.getTotalDaysInViewMonth({ year: selectedYear, monthIndex: selectedMonth - 1 }))
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

  return [
    todayDate,
    targetDate,
    days,
    selectedMonth,
    selectedYear,
    setTodayDate,
    setDays,
    nextWeek,
    prevWeek,
    nextDay,
    prevDay,
    nextMonth,
    prevMonth,
    getMonthByIndex,
    isWeekend,
  ]
}
