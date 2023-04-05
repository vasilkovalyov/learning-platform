import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Calendar from 'modules/Calendar/DefaultCalendar'
import WorkSchedule from 'components/WorkSchedule'

function TeacherLessonsView() {
  return (
    <Box className="teacher-lessons-view">
      <Calendar date={new Date()} />
      <WorkSchedule />
    </Box>
  )
}

export default TeacherLessonsView
