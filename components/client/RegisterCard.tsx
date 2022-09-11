import React from 'react'
import { RegisterType } from '../../types/common'
import Typography from 'antd/lib/typography'

const { Title } = Typography

interface IRegisterCard {
  type: RegisterType
  title: string
}

function getImageByRegisterType(type: RegisterType) {
  if (type === 'student') {
    return <img src="./svg/working-1.svg" alt="student" />
  }
  if (type === 'teacher') {
    return <img src="./svg/teacher-1.svg" alt="teacher" />
  }
  if (type === 'company') {
    return <img src="./svg/company-1.svg" alt="company" />
  }
  return null
}

function RegisterCard({ type, title }: IRegisterCard) {
  return (
    <div className="register-card">
      <div className="register-card__circle"></div>
      <div className="register-card___logo">{getImageByRegisterType(type)}</div>
      <Title level={5} className="register-card__title">
        {title}
      </Title>
    </div>
  )
}

export default RegisterCard
