import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Space from 'antd/lib/space'
import Typography from 'antd/lib/typography'
import { lessonsTypes } from './CalendarEventsTypes.data'

const { Text } = Typography

function CalendarEventsTypes() {
  return (
    <Row gutter={20} wrap={true} className="calendar-event-types">
      {lessonsTypes.map((lessonType, index) => (
        <Col key={index}>
          <Space size={6}>
            <div className="calendar-event-types__color" style={{ backgroundColor: lessonType.color }}></div>
            <Text>{lessonType.title}</Text>
          </Space>
        </Col>
      ))}
    </Row>
  )
}

export default CalendarEventsTypes
