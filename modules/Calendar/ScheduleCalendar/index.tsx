import React, { useState, MouseEvent, useRef } from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'

import { ICalendarSchedule } from './schedule-calendar.type'
import { CalendarEventType } from '../components/CalendarEvent/CalendarEvent.type'

import LessonScheduleCard from '../../../components/LessonScheduleCard'
import { ILessonScheduleCardProps } from '../../../components/LessonScheduleCard/LessonScheduleCard.type'

import { localeDefault } from '../constants'

import CalendarScheduleWeek from '../components/CalendarScheduleWeek'

function ScheduleCalendar({ date = new Date(), events, locale = localeDefault }: ICalendarSchedule) {
  const dayTimesRef = useRef<HTMLDivElement | null>(null)
  const lessonScheduleCardContainerRef = useRef<HTMLDivElement | null>(null)

  const [lessonScheduleCardPosition, setLessonScheduleCardPosition] = useState<object>({ top: 0, left: 0 })
  const [selectedLessonSchedule, setSelectedLessonSchedule] = useState<Omit<
    ILessonScheduleCardProps,
    'onClick'
  > | null>(null)

  function onClickSelectedLesson(id: string) {
    console.log('lesson id = ', id)
  }

  function selectedProps(props: any) {
    console.log('props', props)
  }
  function positionComponent(props: Partial<DOMRect>) {
    console.log('props', props)
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
          ref={lessonScheduleCardContainerRef}
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
            <LessonScheduleCard {...selectedLessonSchedule} onClick={(id) => onClickSelectedLesson(id)} />
          ) : null}
        </Box>
      </CalendarScheduleWeek>
    </Box>
  )
}

export default ScheduleCalendar
