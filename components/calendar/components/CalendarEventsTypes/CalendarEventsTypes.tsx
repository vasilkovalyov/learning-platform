import React from 'react'
import Row from 'antd/lib/row'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import { lessonsTypes } from './CalendarEventsTypes.data'

const { Text } = Typography

function CalendarEventsTypes() {
  return (
    <Row className="calendar-events__event-types">
      <Space size={18}>
        {lessonsTypes.map((lessonType, index) => (
          <Space size={6} key={index}>
            <div className="calendar-events__event-type-color" style={{ backgroundColor: lessonType.color }}></div>
            <Text>{lessonType.title}</Text>
          </Space>
        ))}
      </Space>
    </Row>
  )
}

export default CalendarEventsTypes
