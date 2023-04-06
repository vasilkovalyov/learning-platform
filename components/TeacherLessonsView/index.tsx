import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import ModalPopupBox from 'components/ModalPopupBox'

import Calendar from 'modules/Calendar/DefaultCalendar'
import WorkSchedule from 'components/WorkSchedule'
import PrivateLessonsList from 'components/LessonsList/PrivateLessonsList'
import GroupLessonsList from 'components/LessonsList/GroupLessonsList'
import DeclineLesson from 'components/Forms/DeclineLesson'
import RescheduleLesson from 'components/Forms/RescheduleLesson'

type ModalType = 'private_lesson_decline' | 'group_lesson_decline' | 'group_lesson_reschedule' | null

function TeacherLessonsView() {
  const [isModalOpen, setIsModalOpen] = useState<ModalType | null>(null)

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

  return (
    <Box className="teacher-lessons-view">
      <Calendar date={new Date()} />
      <Box mb={2}></Box>
      <WorkSchedule />
      <Box mb={6}></Box>
      <PrivateLessonsList title="List of private lessons" declineLessons={onHandleDeclinePrivateLesson} />
      <Box mb={6}></Box>
      <GroupLessonsList
        title="List of group lessons"
        declineLessons={onHandleDeclineGroupLesson}
        rescheduleLessons={onHandleReschedulePrivateLesson}
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
