import React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { CalendarEventCategoriesProps } from './CalendarEventCategories.type'

function CalendarEventCategories({ items }: CalendarEventCategoriesProps) {
  return (
    <Box paddingTop={2} paddingBottom={2}>
      <Stack direction="row" spacing={2} className="calendar-event-categories">
        {items.map((lessonType, index) => (
          <Box key={index}>
            <Stack direction="row" spacing={2}>
              <Box className="calendar-event-categories__color" style={{ backgroundColor: lessonType.color }}></Box>
              <Typography variant="subtitle2" className="MuiTypography color-grey-3">
                {lessonType.title}
              </Typography>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}

export default CalendarEventCategories
