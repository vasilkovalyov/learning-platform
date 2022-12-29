import React from 'react'

import cn from 'classnames'
import { ICalendarEventProps } from './CalendarEvent.type'

export default function CalendarEvent({
  id,
  title,
  type,
  eventStart,
  eventEnd,
  isCompact,
  styles,
}: ICalendarEventProps) {
  const typeClassname = cn({
    'calendar-event--personal': type === 'personal',
    'calendar-event--group': type === 'group',
  })

  return (
    <div
      id={`calendar-event-${id}`}
      className={cn('calendar-event', typeClassname, { 'calendar-event--compact': isCompact })}
      style={styles || undefined}
    >
      <p className="calendar-event__title">{title}</p>
      {!isCompact ? (
        <div className="calendar-event__time">
          {eventStart} - {eventEnd}
        </div>
      ) : null}
    </div>
  )
}
