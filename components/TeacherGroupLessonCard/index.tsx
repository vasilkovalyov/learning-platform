import React from 'react'

import Image from 'next/image'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import BadgeTime from '../../components/Badges/BadgeTime'
import BadgeLevel from '../../components/Badges/BadgeLevel'
import BadgeAges from '../../components/Badges/BadgeAges'

import { formatDate } from '../../common/formatDate'
import { TeacherGroupLessonCardProps } from './TeacherGroupLessonCard.type'

function TeacherGroupLessonCard({
  date,
  heading,
  image,
  fullname,
  duration,
  level,
  ages,
  registeredCount,
  maxPersons,
  price,
}: TeacherGroupLessonCardProps) {
  const getPersons = (personsNum: number) => (personsNum > 2 ? 'persons' : 'person')

  return (
    <Box className="teacher-group-lesson-card">
      <Typography marginBottom={1} variant="subtitle2" className="MuiTypography color-grey-3">
        {formatDate(new Date(date), 'DD MMM YYYY')}
      </Typography>
      <Typography marginBottom={2} variant="h6" className="MuiTypography teacher-group-lesson-card__heading">
        {heading}
      </Typography>
      <Box marginBottom={2} className="teacher-group-lesson-card__teacher">
        <Box className="teacher-group-lesson-card__teacher-image">
          <Image src={image.src} alt={image.alt} />
        </Box>
        <Box className="teacher-group-lesson-card__teacher-body">
          <Typography variant="subtitle2" className="MuiTypography color-grey-3">
            teacher
          </Typography>
          <Typography variant="subtitle2" className="MuiTypography font-semibold">
            {fullname}
          </Typography>
        </Box>
      </Box>
      <Stack
        direction="row"
        spacing={2}
        marginBottom={1}
        alignContent="baseline"
        className="teacher-group-lesson-card__badges-list"
      >
        {duration ? <BadgeTime duration={duration} /> : null}
        {level ? <BadgeLevel level={level} /> : null}
        {ages ? <BadgeAges ages={ages} /> : null}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        paddingBottom={2}
        className="teacher-group-lesson-card__info"
      >
        {registeredCount ? (
          <Box>
            <Typography variant="subtitle2" className="MuiTypography color-grey-3">
              Registered
            </Typography>
            <Typography variant="subtitle2" className="MuiTypography">
              {registeredCount} {getPersons(registeredCount)}
            </Typography>
          </Box>
        ) : null}
        {maxPersons ? (
          <Box className="ta-r">
            <Typography variant="subtitle2" className="MuiTypography color-grey-3 ta-r">
              Max Persons:
            </Typography>
            <Typography variant="subtitle2" className="MuiTypography ta-r">
              {maxPersons} {getPersons(maxPersons)}
            </Typography>
          </Box>
        ) : null}
      </Stack>
      <List>
        <ListItem className="booking-test-lesson__info">
          <ListItemText>
            <Typography variant="subtitle2" className="MuiTypography color-dark-blue-1">
              Price
            </Typography>
          </ListItemText>
          <ListItemText className="ta-r">
            <Typography className="MuiTypography font-semibold">{price} $</Typography>
          </ListItemText>
        </ListItem>
      </List>
      <Button fullWidth variant="contained" color="primary" className="booking-private-lesson__button">
        Book Lesson
      </Button>
    </Box>
  )
}

export default TeacherGroupLessonCard
