import React from 'react'
import { IBookingTestLessonProps } from './BookingTestLesson.type'

import List from 'antd/lib/list'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'

import formatDurationTime from 'common/formatDurationTime'

const { Title, Text } = Typography

function BookingTestLesson({ id, heading, duration, price, buttonText }: IBookingTestLessonProps) {
  return (
    <div id={`booking-test-lesson-${id}`} className="booking-test-lesson">
      <Space size={18} direction="vertical" className="booking-test-lesson__body">
        <Title level={4} className="booking-test-lesson__heading font-bold">
          {heading}
        </Title>
        <List>
          <List.Item className="booking-test-lesson__info">
            <Text>Duration</Text>
            <Text className="font-semibold">{formatDurationTime(duration)}</Text>
          </List.Item>
          <List.Item className="booking-test-lesson__info">
            <Text>Price</Text>
            <Text className="font-semibold">{price} $</Text>
          </List.Item>
        </List>
        <Button type="primary" className="booking-test-lesson__button">
          {buttonText}
        </Button>
      </Space>
    </div>
  )
}

export default BookingTestLesson
