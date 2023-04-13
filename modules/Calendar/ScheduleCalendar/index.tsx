import React, { useState } from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'

import { ICalendarSchedule } from './schedule-calendar.type'

import LessonScheduleCard from '../../../components/LessonScheduleCard'
import { LessonScheduleProps } from '../../../components/LessonScheduleCard/LessonScheduleCard.type'

import { localeDefault } from '../constants'

import CalendarScheduleWeek from '../components/CalendarScheduleWeek'

function ScheduleCalendar({
  date = new Date(),
  events,
  locale = localeDefault,
  isLoading,
  onHandleAddLesson,
}: ICalendarSchedule) {
  const [lessonScheduleCardPosition, setLessonScheduleCardPosition] = useState<Partial<DOMRect>>({ top: 0, left: 0 })
  const [selectedLessonSchedule, setSelectedLessonSchedule] = useState<LessonScheduleProps | null>(null)

  function selectedProps(props: object) {
    setSelectedLessonSchedule(props as LessonScheduleProps)
  }
  function positionComponent(props: Partial<DOMRect>) {
    setLessonScheduleCardPosition(props)
  }

  return (
    <Box className="schedule-calendar">
      <CalendarScheduleWeek
        date={date}
        events={events}
        locale={locale}
        selectedProps={selectedProps}
        positionComponent={positionComponent}
      >
        <Box
          className={cn('lesson-schedule-card-position-container', {
            'lesson-schedule-card-position-container--show': selectedLessonSchedule !== null,
          })}
          style={lessonScheduleCardPosition}
          onMouseLeave={() => {
            setSelectedLessonSchedule(null)
            setLessonScheduleCardPosition({
              top: 0,
              left: 0,
            })
          }}
        >
          {selectedLessonSchedule ? (
            <LessonScheduleCard
              {...selectedLessonSchedule}
              isLoading={isLoading || false}
              onClick={(id) => onHandleAddLesson && onHandleAddLesson(id)}
            />
          ) : null}
        </Box>
      </CalendarScheduleWeek>
    </Box>
  )
}

export default ScheduleCalendar
