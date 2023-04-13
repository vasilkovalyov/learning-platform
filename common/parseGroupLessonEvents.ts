import { CalendarEventType } from 'modules/Calendar/utilities/types'
import { IGroupLessonProps } from 'interfaces/group-lesson.interface'
import { getEndTime } from 'common/utilities'
import { CalendarEventCategory } from 'modules/Calendar/components/CalendarEvent/CalendarEvent.type'

export default function parseLessonEvents(
  lessons: IGroupLessonProps[],
  typeLesson: CalendarEventCategory,
): CalendarEventType[] {
  return lessons.map<CalendarEventType>((lesson) => {
    const eventStart = `${lesson.recruitment_period_date_start.split('T')[0]}T${lesson.timeStart}:00`
    const timeEnd = getEndTime(lesson.dateLesson.split('T')[0], lesson.timeStart, lesson.duration || 0)
    const eventEnd = `${lesson.recruitment_period_date_end.split('T')[0]}T${timeEnd}:00`
    return {
      id: lesson._id,
      eventStart: eventStart,
      eventEnd: eventEnd,
      title: lesson.name,
      subtitle: lesson.description,
      type: typeLesson,
    }
  })
}
