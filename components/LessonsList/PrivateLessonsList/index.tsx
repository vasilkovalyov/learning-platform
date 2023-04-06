import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'

import ShadowContainer from '../../ShadowContainer'

import TeacherPaidCard from '../../TeacherPaidCard'

import { IPrivateLessonsList, IFilterLesson } from './PrivateLessonsList.type'

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

function PrivateLessonsList({ title, declineLessons }: IPrivateLessonsList) {
  function handleClickFilterLesson(days: number | string) {
    console.log(days)
  }

  return (
    <Box className="private-lessons-list">
      <FilterToggler
        title={title}
        filterItems={filterItems}
        selectedValue={filterItems[0].days}
        onChange={handleClickFilterLesson}
      />
      <Grid container spacing={2} mb={4}>
        {Array.from(Array(6).keys()).map((item) => (
          <Grid key={item} item md={6} className="private-lessons-list__item">
            <TeacherPaidCard
              image={{
                src: avatar,
                alt: 'Test name',
              }}
              fullname="Test name"
              dateTimestamp="2023-01-16T18:21:47.591Z"
            />
            <ShadowContainer className="private-lesson-tooltip-container">
              <Button variant="outlined" onClick={() => declineLessons && declineLessons(item.toString())}>
                Decline Lesson
              </Button>
            </ShadowContainer>
          </Grid>
        ))}
      </Grid>
      <Button variant="outlined">Show more</Button>
    </Box>
  )
}

export default PrivateLessonsList
