import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import ShadowContainer from '../../ShadowContainer'

import LessonCard from '../../LessonCard'

import { IGroupLessonsList, IFilterLesson } from './GroupLessonsList.type'

import avatar from '../../../public/images/teacher-image.jpg'
import { getEndTime } from '../../../common/utilities'

import FilterToggler from '../FilterLessonsToggler'

const filterItems: IFilterLesson[] = [
  {
    days: 1,
    label: 'Tomorrow',
  },
  {
    days: 3,
    label: '3 days',
  },
  {
    days: 7,
    label: '1 Week',
  },
  {
    days: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
    label: 'Month',
  },
  {
    days: 'all',
    label: 'All',
  },
]

function PrivateLessonsList({ title, lessons, declineLessons, rescheduleLessons }: IGroupLessonsList) {
  function handleClickFilterLesson(days: number | string) {
    console.log(days)
  }

  return (
    <Box className="group-lessons-list">
      <FilterToggler
        title={title}
        filterItems={filterItems}
        selectedValue={filterItems[filterItems.length - 1].days}
        onChange={handleClickFilterLesson}
      />
      {lessons.length ? (
        <Grid container spacing={2} mb={4}>
          {lessons.map((item) => (
            <Grid key={item._id} item md={6} className="group-lessons-list__item">
              <LessonCard
                id={item._id}
                date={item.dateLesson.split('T')[0]}
                eventStart={item.timeStart}
                eventEnd={getEndTime(item.dateLesson.split('T')[0], item.timeStart, item.duration || 0)}
                heading={item.name}
                maxPersons={item.max_count_of_students}
                registeredCount={item.students.length}
              />
              <ShadowContainer className="group-lesson-tooltip-container">
                <Box mb={2}>
                  <Button href={`/admin/group-lesson/edit/${item._id}`} variant="outlined">
                    Edit Lesson
                  </Button>
                </Box>
                <Box mb={2}>
                  <Button variant="outlined" onClick={() => rescheduleLessons && rescheduleLessons(item.toString())}>
                    Reschedule Lesson
                  </Button>
                </Box>
                <Box>
                  <Button variant="outlined" onClick={() => declineLessons && declineLessons(item.toString())}>
                    Decline Lesson
                  </Button>
                </Box>
              </ShadowContainer>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box>Lessons not found</Box>
      )}

      <Stack direction="row" spacing={2}>
        <Button href="/admin/group-lesson/create" variant="contained">
          Add Group lesson
        </Button>
        <Button variant="outlined">Show more</Button>
      </Stack>
    </Box>
  )
}

export default PrivateLessonsList
