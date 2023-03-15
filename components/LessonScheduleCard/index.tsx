import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { formatDate } from '../calendar/utilities/date'
import { getTimeFormatTimestamp } from '../calendar/utilities/custom'

import { ILessonScheduleCardProps } from './LessonScheduleCard.type'

function LessonScheduleCard({ id, eventStart, eventEnd, price, onClick }: ILessonScheduleCardProps) {
  const timeStart = getTimeFormatTimestamp(eventStart)
  const timeEng = getTimeFormatTimestamp(eventEnd)
  return (
    <Box id={`lesson-schedule-card-${id}`} className="lesson-schedule-card">
      <Box className="lesson-schedule-card__body">
        <Box marginBottom={1}>
          <Stack className="lesson-schedule-card__list-info">
            <Box className="lesson-schedule-card__list-info-item d-flex-justify-start" marginBottom={1}>
              <Stack direction="row" spacing={1}>
                <Typography className="MuiTypography">Date:</Typography>
                <Typography className="MuiTypography font-semibold">
                  {formatDate(new Date(eventStart), 'DD MMMM')}
                </Typography>
              </Stack>
            </Box>
            <Box className="lesson-schedule-card__list-info-item d-flex-justify-start" marginBottom={1}>
              <Stack direction="row" spacing={1}>
                <Typography className="MuiTypography">Time:</Typography>
                <Typography className="MuiTypography font-semibold">
                  {timeStart} - {timeEng}
                </Typography>
              </Stack>
            </Box>
            <Box className="lesson-schedule-card__list-info-item d-flex-justify-start" marginBottom={1}>
              <Stack direction="row" spacing={1}>
                <Typography className="MuiTypography">Price:</Typography>
                <Typography className="MuiTypography font-semibold">{price} $</Typography>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <Button variant="contained" fullWidth className="lesson-schedule-card__button" onClick={() => onClick(id)}>
          Book a lesson
        </Button>
      </Box>
    </Box>
  )
}

export default LessonScheduleCard
