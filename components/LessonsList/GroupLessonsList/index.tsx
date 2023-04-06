import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import ShadowContainer from '../../ShadowContainer'

import LessonCard from '../../LessonCard'

import { IGroupLessonsList, IFilterLesson } from './GroupLessonsList.type'

import avatar from '../../../public/images/teacher-image.jpg'

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

function PrivateLessonsList({ title, declineLessons, rescheduleLessons }: IGroupLessonsList) {
  function handleClickFilterLesson(days: number | string) {
    console.log(days)
  }

  return (
    <Box className="group-lessons-list">
      <FilterToggler
        title={title}
        filterItems={filterItems}
        selectedValue={filterItems[0].days}
        onChange={handleClickFilterLesson}
      />
      <Grid container spacing={2} mb={4}>
        {Array.from(Array(6).keys()).map((item) => (
          <Grid key={item} item md={6} className="group-lessons-list__item">
            <LessonCard
              id={item.toString()}
              date="2023-04-13"
              eventStart="13:00"
              eventEnd="14:30"
              heading={'Heading'}
              maxPersons={10}
              registeredCount={6}
            />
            <ShadowContainer className="group-lesson-tooltip-container">
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
      <Button variant="outlined">Show more</Button>
    </Box>
  )
}

export default PrivateLessonsList
