import {
  CalendarEventCategory,
  CalendarEventCategoriesColor,
  CalendarLessonCategoriesColor,
} from './CalendarEventCategories.type'
export const eventsTypes: CalendarEventCategory[] = [
  {
    color: CalendarEventCategoriesColor.PERSONAL_LESSON,
    title: 'Personal lessons',
    type: 'personal_lesson',
  },
  {
    color: CalendarEventCategoriesColor.GROUP_LESSON,
    title: 'Group lessons',
    type: 'group_lesson',
  },
  {
    color: CalendarEventCategoriesColor.AVAILABLE_TIME,
    title: 'Available time',
    type: 'available_time',
  },
  {
    color: CalendarEventCategoriesColor.UNAVAILABLE_TIME,
    title: 'Unavailable time',
    type: 'unavailable_time',
  },
]

export const lessonsTypes: CalendarEventCategory[] = [
  {
    color: CalendarLessonCategoriesColor.PERSONAL_LESSON,
    title: 'Personal lessons',
    type: 'personal_lesson',
  },
  {
    color: CalendarLessonCategoriesColor.GROUP_LESSON,
    title: 'Group lessons',
    type: 'group_lesson',
  },
  {
    color: CalendarLessonCategoriesColor.COURSE_LESSON,
    title: 'Course lesson',
    type: 'course_lesson',
  },
]
