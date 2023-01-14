import React from 'react'
import { IBookingTestLessonProps } from './BookingTestLesson.type'

import formatDurationTime from 'common/formatDurationTime'

function BookingTestLesson({ id, heading, duration, price, buttonText }: IBookingTestLessonProps) {
  return (
    <div id={`booking-test-lesson-${id}`} className="booking-test-lesson">
      <div className="booking-test-lesson__body">
        <h4 className="booking-test-lesson__heading font-bold">{heading}</h4>
        <ul>
          <li className="booking-test-lesson__info">
            <span>Duration</span>
            <span className="font-semibold">{formatDurationTime(duration)}</span>
          </li>
          <li className="booking-test-lesson__info">
            <span>Price</span>
            <span className="font-semibold">{price} $</span>
          </li>
        </ul>
        <button className="booking-test-lesson__button">{buttonText}</button>
      </div>
    </div>
  )
}

export default BookingTestLesson
