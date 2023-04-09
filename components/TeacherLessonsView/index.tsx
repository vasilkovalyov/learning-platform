import React, { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { selectAuthState, setUpdateAccountUser } from 'redux/slices/auth'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ModalPopupBox from 'components/ModalPopupBox'

import Calendar from 'modules/Calendar/DefaultCalendar'
import WorkSchedule from 'components/WorkSchedule'
import PrivateLessonsList from 'components/LessonsList/PrivateLessonsList'
import GroupLessonsList from 'components/LessonsList/GroupLessonsList'
import DeclineLesson from 'components/Forms/DeclineLesson'
import RescheduleLesson from 'components/Forms/RescheduleLesson'

import teacherService from 'services/teacher.service'
import { IGroupLessonProps } from 'interfaces/group-lesson.interface'
import { CalendarEventType } from 'modules/Calendar/utilities/types'

import { getEndTime } from 'common/utilities'

type ModalType = 'private_lesson_decline' | 'group_lesson_decline' | 'group_lesson_reschedule' | null

function TeacherLessonsView() {
  const authState = useSelector(selectAuthState)

  const [isModalOpen, setIsModalOpen] = useState<ModalType | null>(null)
  const [groupLessons, setGroupLessons] = useState<IGroupLessonProps[] | []>([])

  const [events, setEvents] = useState<CalendarEventType[] | []>([])

  function onHandleDeclinePrivateLesson(id: string) {
    console.log('id', id)
    setIsModalOpen('private_lesson_decline')
  }
  function onHandleDeclineGroupLesson(id: string) {
    console.log('id', id)
    setIsModalOpen('group_lesson_decline')
  }
  function onHandleReschedulePrivateLesson(id: string) {
    console.log('id', id)
    setIsModalOpen('group_lesson_reschedule')
  }

  async function loadGroupLessons() {
    const response = await teacherService.getUserGroupLessons(authState.user._id)

    if (response.data.length) {
      const events = response.data.map<CalendarEventType>((event) => {
        const eventStart = `${event.recruitment_period_date_start.split('T')[0]}T${event.timeStart}:00`
        const timeEnd = getEndTime(event.dateLesson.split('T')[0], event.timeStart, event.duration || 0)
        const eventEnd = `${event.recruitment_period_date_end.split('T')[0]}T${timeEnd}:00`
        return {
          id: event._id,
          eventStart: eventStart,
          eventEnd: eventEnd,
          title: event.name,
          subtitle: event.description,
          type: 'group',
        }
      })
      setEvents(events)
    }
    setGroupLessons(response.data)
  }

  useEffect(() => {
    loadGroupLessons()
  }, [])

  return (
    <Box className="teacher-lessons-view">
      <Calendar date={new Date()} events={events} />
      <Box mb={2}></Box>
      <WorkSchedule />
      <Box mb={6}></Box>
      <PrivateLessonsList title="List of private lessons" declineLessons={onHandleDeclinePrivateLesson} />
      <Box mb={6}></Box>
      <GroupLessonsList
        title="List of group lessons"
        declineLessons={onHandleDeclineGroupLesson}
        rescheduleLessons={onHandleReschedulePrivateLesson}
        lessons={groupLessons}
      />
      <Box mb={6}></Box>
      <Modal open={!!isModalOpen} onClose={() => setIsModalOpen(null)}>
        <>
          <ModalPopupBox type="default" onHandleClose={() => setIsModalOpen(null)}>
            {isModalOpen === 'private_lesson_decline' ? <DeclineLesson onSubmit={(v) => console.log(v)} /> : null}
            {isModalOpen === 'group_lesson_decline' ? <DeclineLesson onSubmit={(v) => console.log(v)} /> : null}
            {isModalOpen === 'group_lesson_reschedule' ? <RescheduleLesson onSubmit={(v) => console.log(v)} /> : null}
          </ModalPopupBox>
        </>
      </Modal>
    </Box>
  )
}

export default TeacherLessonsView
