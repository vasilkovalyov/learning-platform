import { IPrivateLessonsList } from './PrivateLessonsList.type'

export const model: IPrivateLessonsList = {
  title: 'List of private lessons',
  filterItems: [
    {
      days: 1,
      label: 'Tomorrow',
    },
    {
      days: 3,
      label: '3 days',
    },
    {
      days: 7,
      label: '1 Week',
    },
    {
      days: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate(),
      label: 'Month',
    },
  ],
}
