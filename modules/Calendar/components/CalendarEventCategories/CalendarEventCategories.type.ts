export enum CalendarEventCategoriesColor {
  PERSONAL_LESSON = '#D1EAE7',
  GROUP_LESSON = '#FAEEDF',
  AVAILABLE_TIME = '#E9F4FF',
  UNAVAILABLE_TIME = '#F2F5FA',
}

export enum CalendarLessonCategoriesColor {
  PERSONAL_LESSON = '#C0D1FF',
  GROUP_LESSON = '#A7E6C8',
  COURSE_LESSON = '#FCAAAA',
}

export interface CalendarEventCategoriesProps {
  items: CalendarEventCategory[]
}

export interface CalendarEventCategory {
  type: string
  title: string
  color: string
}
