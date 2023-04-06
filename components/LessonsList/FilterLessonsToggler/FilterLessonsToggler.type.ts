export interface IFilterLessonsTogglerProps {
  title: string
  filterItems: IFilterLessonDate[]
  selectedValue: FilterLessonValueType
  onChange: (value: FilterLessonValueType) => void
}

export interface IFilterLessonDate {
  days: FilterLessonValueType
  label: string
}

export type FilterLessonValueType = number | string
