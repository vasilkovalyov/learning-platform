import React from 'react'

import Icon from '../../components/Generic/Icon'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { LessonCardProps } from './LessonCard.type'

import colors from '../../constants/colors'

function LessonCard({ dateTimestamp, eventStart, eventEnd, heading, registeredCount, maxPersons }: LessonCardProps) {
  const getPersonspan = (personsNum: number) => (personsNum > 2 ? 'persons' : 'person')
  return (
    <div className="lesson-card">
      <Stack direction="row" spacing={2} marginBottom={2} alignContent="baseline">
        {dateTimestamp ? (
          <Box className="lesson-card__badge lesson-card__badge--date color-black font-semibold">
            <Icon icon="calendar" size={14} color={colors.green_color} />
            {dateTimestamp}
          </Box>
        ) : null}
        {eventStart && eventEnd ? (
          <Box className="lesson-card__badge lesson-card__badge--time color-black font-semibold">
            <Icon icon="clock-circular-outline" size={14} color={colors.primary_color} />
            {eventStart}
            <span> - </span>
            {eventEnd}
          </Box>
        ) : null}
      </Stack>
      <Typography variant="h6" className="MuiTypography lesson-card__heading color-black font-bold">
        {heading}
      </Typography>
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        {registeredCount ? (
          <Box>
            <Typography variant="subtitle2" className="MuiTypography color-grey-3">
              Registered
            </Typography>
            <Typography variant="subtitle2" className="MuiTypography">
              {registeredCount} {getPersonspan(registeredCount)}
            </Typography>
          </Box>
        ) : null}
        {maxPersons ? (
          <Box className="ta-r">
            <Typography variant="subtitle2" className="MuiTypography color-grey-3 ta-r">
              Max Persons:
            </Typography>
            <Typography variant="subtitle2" className="MuiTypography ta-r">
              {maxPersons} {getPersonspan(maxPersons)}
            </Typography>
          </Box>
        ) : null}
      </Stack>
      {/* {registeredCount ? (
        <div>
          <p className="lesson-card__info-heading">
            <span className="color-grey">Registered</span>
          </p>
          <span>
            {registeredCount} {getPersonspan(registeredCount)}
          </span>
        </div>
      ) : null}
      {maxPersons ? (
        <div>
          <p className="lesson-card__info-heading">
            <span className="color-grey">Max Persons:</span>
          </p>
          <span>
            {maxPersons} {getPersonspan(maxPersons)}
          </span>
        </div>
      ) : null} */}
    </div>
  )
}

export default LessonCard
