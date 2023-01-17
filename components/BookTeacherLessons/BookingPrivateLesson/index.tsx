import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import { IBookingPrivateLessonProps } from './BookingPrivateLesson.type'

function BookingTestLesson({ id, heading, price, lessonDays, buttonText }: IBookingPrivateLessonProps) {
  const [calculatePrice, setCalculatePrice] = useState<number>(price)
  const [radioValue, setRadioValue] = useState<number>(1)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setCalculatePrice(value * price)
    setRadioValue(value)
  }

  return (
    <Box id={id} className="booking-private-lesson">
      <Box className="booking-private-lesson__body">
        <Typography marginBottom={2} variant="h4" className="MuiTypography booking-private-lesson__heading font-bold">
          {heading}
        </Typography>
        <Box className="booking-private-lesson__count-lessons-info">
          <Typography variant="subtitle2" className="MuiTypography color-grey-3">
            Count of lessons
          </Typography>
          <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={radioValue}
            onChange={handleChange}
          >
            {lessonDays.map((lesson, index) => (
              <FormControlLabel
                className="MuiFormControlRadio"
                key={index}
                value={lesson}
                control={<Radio />}
                label={lesson}
              />
            ))}
          </RadioGroup>
        </Box>
        <List>
          <ListItem className="booking-test-lesson__info">
            <ListItemText>
              <Typography variant="subtitle2" className="MuiTypography color-dark-blue-1">
                Price
              </Typography>
            </ListItemText>
            <ListItemText className="ta-r">
              <Typography className="MuiTypography font-semibold">{calculatePrice} $</Typography>
            </ListItemText>
          </ListItem>
        </List>
        <Button fullWidth variant="contained" color="primary" className="booking-private-lesson__button">
          {buttonText}
        </Button>
      </Box>
    </Box>
  )
}

export default BookingTestLesson
