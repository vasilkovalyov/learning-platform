import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { IBookingTestLessonProps } from './BookingTestLesson.type'

import formatDurationTime from '../../../common/formatDurationTime'

function BookingTestLesson({ id, heading, duration, price, buttonText }: IBookingTestLessonProps) {
  return (
    <Box id={id} className="booking-test-lesson">
      <Box className="booking-test-lesson__body">
        <Typography marginBottom={2} variant="h4" className="MuiTypography booking-test-lesson__heading font-bold">
          {heading}
        </Typography>
        <List className="booking-test-lesson__info-list">
          <ListItem className="booking-test-lesson__info">
            <ListItemText>
              <Typography variant="subtitle2" className="MuiTypography color-dark-blue-1">
                Duration
              </Typography>
            </ListItemText>
            <ListItemText className="font-semibold ta-r">
              <Typography className="MuiTypography font-semibold">{formatDurationTime(duration)}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem className="booking-test-lesson__info">
            <ListItemText>
              <Typography variant="subtitle2" className="MuiTypography color-dark-blue-1">
                Price
              </Typography>
            </ListItemText>
            <ListItemText className="font-semibold ta-r">
              <Typography className="MuiTypography font-semibold">{price} $</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Button fullWidth variant="contained" color="primary" className="booking-test-lesson__button">
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default BookingTestLesson
