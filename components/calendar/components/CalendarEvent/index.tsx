import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { ICalendarEventProps } from './CalendarEvent.type'

export default function CalendarEvent({
  id,
  title,
  subtitle,
  type,
  eventStart,
  eventEnd,
  isCompact,
  styles,
}: ICalendarEventProps) {
  const typeClassname = cn({
    'calendar-event--personal': type === 'personal',
    'calendar-event--group': type === 'group',
    'calendar-event--course': type === 'course',
  })

  return (
    <Box
      id={`calendar-event-${id}`}
      className={cn('calendar-event', typeClassname, { 'calendar-event--compact': isCompact })}
      style={styles || undefined}
    >
      <Typography variant="subtitle2" className="MuiTypography calendar-event__title font-semibold">
        {title}
      </Typography>
      {!isCompact && subtitle ? (
        <Typography variant="caption" className="MuiTypography calendar-event__title font-semibold">
          {subtitle}
        </Typography>
      ) : null}
      {!isCompact ? (
        <Typography variant="subtitle2" className="MuiTypography color-grey-3 calendar-event__time">
          {eventStart} - {eventEnd}
        </Typography>
      ) : null}
    </Box>
  )
}
