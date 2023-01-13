import React from 'react'
import { RoleType } from 'types/common'

interface IRegisterCard {
  type: RoleType
  title: string
}

function getImageByRegisterType(type: RoleType) {
  if (type === 'student') {
    return <img src="./svg/working-1.svg" alt="student" />
  }
  if (type === 'teacher') {
    return <img src="./svg/teacher-1.svg" alt="teacher" />
  }
  return null
}

function RegisterCard({ type, title }: IRegisterCard) {
  return (
    <div className="register-card">
      <div className="register-card__circle"></div>
      <div className="register-card___logo">{getImageByRegisterType(type)}</div>
      <h5 className="register-card__title">{title}</h5>
    </div>
  )
}

export default RegisterCard
