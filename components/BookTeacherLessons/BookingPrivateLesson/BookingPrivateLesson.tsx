import React, { useState } from 'react'
import { IBookingPrivateLessonProps } from './BookingPrivateLesson.type'

import List from 'antd/lib/list'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Radio, { RadioChangeEvent } from 'antd/lib/radio'
import Typography from 'antd/lib/typography'

const { Title, Text, Paragraph } = Typography

function BookingTestLesson({ id, heading, price, buttonText }: IBookingPrivateLessonProps) {
  const [calculatePrice, setCalculatePrice] = useState<number>(price)
  const [radioValue, setRadioValue] = useState<number>(1)
  const lessonsData = [1, 2, 4, 6, 8, 10, 12]

  const onChange = (e: RadioChangeEvent) => {
    setCalculatePrice(e.target.value * price)
    setRadioValue(e.target.value)
  }

  return (
    <div id={`booking-private-lesson-${id}`} className="booking-private-lesson">
      <Space size={18} direction="vertical" className="booking-private-lesson__body">
        <Title level={4} className="booking-private-lesson__heading font-bold">
          {heading}
        </Title>
        <Space size={0} direction="vertical" className="booking-private-lesson__count-lessons-info">
          <Paragraph>Count of lessons</Paragraph>
          <Radio.Group onChange={onChange} value={radioValue}>
            {lessonsData.map((lesson) => (
              <Radio key={lesson} value={lesson}>
                {lesson}
              </Radio>
            ))}
          </Radio.Group>
        </Space>
        <List>
          <List.Item className="booking-test-lesson__info">
            <Text>Price</Text>
            <Text className="font-semibold">{calculatePrice} $</Text>
          </List.Item>
        </List>
        <Button type="primary" className="booking-private-lesson__button">
          {buttonText}
        </Button>
      </Space>
    </div>
  )
}

export default BookingTestLesson
