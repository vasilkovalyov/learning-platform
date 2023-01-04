import React from 'react'

import { formatDate } from '../calendar/utilities/date'
import { getTimeFormatTimestamp } from '../calendar/utilities/custom'

import { ILessonScheduleCardProps } from './LessonScheduleCard.type'

function LessonScheduleCard({ id, dateStart, dateEnd, price, onClick }: ILessonScheduleCardProps) {
  const timeStart = getTimeFormatTimestamp(dateStart)
  const timeEng = getTimeFormatTimestamp(dateEnd)
  return (
    <div id={`lesson-schedule-card-${id}`} className="lesson-schedule-card">
      <div className="lesson-schedule-card__body">
        <ul className="lesson-schedule-card__list-info">
          <li className="lesson-schedule-card__list-info-item d-flex-justify-start">
            <span>Date:</span>
            <p>
              <strong>{formatDate(new Date(dateStart), 'DD MMMM')}</strong>
            </p>
          </li>
          <li className="lesson-schedule-card__list-info-item d-flex-justify-start">
            <span>Time:</span>
            <p>
              <strong>
                {timeStart} - {timeEng}
              </strong>
            </p>
          </li>
          <li className="lesson-schedule-card__list-info-item d-flex-justify-start">
            <span>Price:</span>
            <p>
              <strong>{price} $</strong>
            </p>
          </li>
        </ul>
        <button className="lesson-schedule-card__button" onClick={() => onClick(id)}>
          Book a lesson
        </button>
      </div>
    </div>
  )
}

export default LessonScheduleCard
