import React from 'react'

import Icon from 'components/Icon'

import { ILessonCardProps } from './LessonCard.type'

import colors from '../../constants/colors'

function LessonCard({ dateTimestamp, eventStart, eventEnd, heading, registeredCount, maxPersons }: ILessonCardProps) {
  const getPersonspan = (personsNum: number) => (personsNum > 2 ? 'persons' : 'person')
  return (
    <div className="lesson-card">
      <div>
        <div>
          <span className="lesson-card__badge lesson-card__badge--date color-black font-semibold">
            <Icon icon="calendar" size={14} color={colors.GREEN_COLOR} />
            {dateTimestamp}
          </span>
        </div>
        <div>
          <span className="lesson-card__badge lesson-card__badge--time color-black font-semibold">
            <Icon icon="clock-circular-outline" size={14} color={colors.PRIMARY_COLOR} />
            {eventStart}
            <span> - </span>
            {eventEnd}
          </span>
        </div>
        <div>
          <h5 className="lesson-card__heading color-black font-bold">{heading}</h5>
        </div>
        {registeredCount ? (
          <div>
            <p className="lesson-card__info-heading">
              <span className="color-grey">Registered</span>
            </p>
            <span>
              {registeredCount} {getPersonspan(registeredCount)}
            </span>
          </div>
        ) : null}
        {maxPersons ? (
          <div>
            <p className="lesson-card__info-heading">
              <span className="color-grey">Max Persons:</span>
            </p>
            <span>
              {maxPersons} {getPersonspan(maxPersons)}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default LessonCard
