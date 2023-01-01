import React from 'react'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Typography from 'antd/lib/typography'
import Icon from 'components/Icon'

import { ILessonCardProps } from './LessonCard.type'

import colors from '../../constants/colors'

const { Text, Title, Paragraph } = Typography

function LessonCard({ dateTimestamp, eventStart, eventEnd, heading, registeredCount, maxPersons }: ILessonCardProps) {
  const getPersonText = (personsNum: number) => (personsNum > 2 ? 'persons' : 'person')
  return (
    <div className="lesson-card">
      <Row>
        <Col span={24} xs={12}>
          <Text className="lesson-card__badge lesson-card__badge--date color-black font-semibold">
            <Icon icon="calendar" size={14} color={colors.GREEN_COLOR} />
            {dateTimestamp}
          </Text>
        </Col>
        <Col span={24} xs={12}>
          <Text className="lesson-card__badge lesson-card__badge--time color-black font-semibold">
            <Icon icon="clock-circular-outline" size={14} color={colors.PRIMARY_COLOR} />
            {eventStart}
            <span> - </span>
            {eventEnd}
          </Text>
        </Col>
        <Col>
          <Title level={5} className="lesson-card__heading color-black font-bold">
            {heading}
          </Title>
        </Col>
        {registeredCount ? (
          <Col span={24} sm={12}>
            <Paragraph className="lesson-card__info-heading">
              <Text className="color-grey">Registered</Text>
            </Paragraph>
            <Text>
              {registeredCount} {getPersonText(registeredCount)}
            </Text>
          </Col>
        ) : null}
        {maxPersons ? (
          <Col span={24} sm={12}>
            <Paragraph className="lesson-card__info-heading">
              <Text className="color-grey">Max Persons:</Text>
            </Paragraph>
            <Text>
              {maxPersons} {getPersonText(maxPersons)}
            </Text>
          </Col>
        ) : null}
      </Row>
    </div>
  )
}

export default LessonCard
