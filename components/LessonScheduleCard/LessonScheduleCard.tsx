import React from 'react'

import List from 'antd/lib/list'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import Typography from 'antd/lib/typography'

import { formatDate } from '../calendar/utilities/date'
import { getTimeFormatTimestamp } from '../calendar/utilities/custom'

import { ILessonScheduleCardProps } from './LessonScheduleCard.type'

const { Text } = Typography

function LessonScheduleCard({ id, dateStart, dateEnd, price, onClick }: ILessonScheduleCardProps) {
  const timeStart = getTimeFormatTimestamp(dateStart)
  const timeEng = getTimeFormatTimestamp(dateEnd)
  return (
    <div id={`lesson-schedule-card-${id}`} className="lesson-schedule-card">
      <Space direction="vertical" size={18} className="lesson-schedule-card__body">
        <List bordered={false} className="lesson-schedule-card__list-info">
          <List.Item className="lesson-schedule-card__list-info-item d-flex-justify-start">
            <Space>
              <Text>Date:</Text>
              <Text>
                <strong>{formatDate(new Date(dateStart), 'DD MMMM')}</strong>
              </Text>
            </Space>
          </List.Item>
          <List.Item className="lesson-schedule-card__list-info-item d-flex-justify-start">
            <Space>
              <Text>Time:</Text>
              <Text>
                <strong>
                  {timeStart} - {timeEng}
                </strong>
              </Text>
            </Space>
          </List.Item>
          <List.Item className="lesson-schedule-card__list-info-item d-flex-justify-start">
            <Space>
              <Text>Price:</Text>
              <Text>
                <strong>{price} $</strong>
              </Text>
            </Space>
          </List.Item>
        </List>
        <Button type="primary" className="lesson-schedule-card__button" onClick={() => onClick(id)}>
          Book a lesson
        </Button>
      </Space>
    </div>
  )
}

export default LessonScheduleCard
