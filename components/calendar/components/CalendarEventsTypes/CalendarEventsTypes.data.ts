import { ICalendarEventType, CalendarEventTypeColor } from './CalendarEventsTypes.type'
export const lessonsTypes: ICalendarEventType[] = [
  {
    color: CalendarEventTypeColor.PERSONAL_LESSON,
    title: 'Personal lessons',
    type: 'personal_lesson',
  },
  {
    color: CalendarEventTypeColor.GROUP_LESSON,
    title: 'Group lessons',
    type: 'group_lesson',
  },
  {
    color: CalendarEventTypeColor.AVAILABLE_TIME,
    title: 'Available time',
    type: 'available_time',
  },
  {
    color: CalendarEventTypeColor.UNAVAILABLE_TIME,
    title: 'Unavailable time',
    type: 'unavailable_time',
  },
]
