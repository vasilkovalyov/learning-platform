import React from 'react'

import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import BadgeDate from '../../components/Badges/BadgeDate'
import BadgeTime from '../../components/Badges/BadgeTime'

import { LessonCardProps } from './LessonCard.type'

function LessonCard({ date, eventStart, eventEnd, heading, registeredCount, maxPersons }: LessonCardProps) {
  const getPersons = (personsNum: number) => (personsNum > 2 ? 'persons' : 'person')
  return (
    <div className="lesson-card">
      <Stack direction="row" spacing={2} marginBottom={2} alignContent="baseline">
        {date ? <BadgeDate date={date} /> : null}
        {eventStart && eventEnd ? <BadgeTime startTime={eventStart} endTime={eventEnd} /> : null}
      </Stack>
      <Typography marginBottom={2} variant="h6" className="MuiTypography lesson-card__heading color-black font-bold">
        {heading}
      </Typography>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
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
    </div>
  )
}

export default LessonCard
