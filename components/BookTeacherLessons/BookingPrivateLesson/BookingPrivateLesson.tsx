import React, { useState } from 'react'
import { IBookingPrivateLessonProps } from './BookingPrivateLesson.type'

function BookingTestLesson({ id, heading, price, buttonText }: IBookingPrivateLessonProps) {
  const [calculatePrice, setCalculatePrice] = useState<number>(price)
  const [radioValue, setRadioValue] = useState<number>(1)
  const lessonsData = [1, 2, 4, 6, 8, 10, 12]

  const onChange = (e: any) => {
    setCalculatePrice(e.target.value * price)
    setRadioValue(e.target.value)
  }

  return (
    <div id={`booking-private-lesson-${id}`} className="booking-private-lesson">
      <div className="booking-private-lesson__body">
        <h4 className="booking-private-lesson__heading font-bold">{heading}</h4>
        <div className="booking-private-lesson__count-lessons-info">
          <div>Count of lessons</div>
          <div onChange={onChange}>
            {lessonsData.map((lesson) => (
              <div key={lesson}>{lesson}</div>
            ))}
          </div>
        </div>
        <ul>
          <li className="booking-test-lesson__info">
            <span>Price</span>
            <span className="font-semibold">{calculatePrice} $</span>
          </li>
        </ul>
        <button className="booking-private-lesson__button">{buttonText}</button>
      </div>
    </div>
  )
}

export default BookingTestLesson
