import { CalendarEventType } from '../CalendarEvent/CalendarEvent.type'

export const model: CalendarEventType[] = [
  {
    id: '1',
    type: 'course',
    title: 'Course 1',
    subtitle: 'Lesson description',
    eventStart: '2023-03-25T08:00:50.015Z',
    eventEnd: '2023-03-25T09:30:50.015Z',
  },
  {
    id: '2',
    type: 'group',
    title: 'Course 2',
    subtitle: 'Lesson description',
    eventStart: '2023-03-23T16:00:50.015Z',
    eventEnd: '2023-03-23T17:30:50.015Z',
  },
  {
    id: '3',
    type: 'personal',
    title: 'Course 3',
    subtitle: 'Lesson description',
    eventStart: '2023-03-26T12:20:50.015Z',
    eventEnd: '2023-03-26T13:20:50.015Z',
  },
  {
    id: '4',
    type: 'personal',
    title: 'Course 4',
    subtitle: 'Lesson description',
    eventStart: '2023-03-26T12:00:50.015Z',
    eventEnd: '2023-03-26T14:00:50.015Z',
  },
  {
    id: '5',
    type: 'group',
    title: 'Course 5',
    subtitle: 'Lesson description',
    eventStart: '2023-03-26T14:50:50.015Z',
    eventEnd: '2023-03-26T15:40:50.015Z',
  },
]
