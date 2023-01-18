import React from 'react'
import Image from 'next/image'
import { RoleType } from 'types/common'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import studentImg from '../../public/svg/working-1.svg'
import teacherImg from '../../public/svg/teacher-1.svg'

interface IRegisterCard {
  type: RoleType
  title: string
}

function getImageByRegisterType(type: RoleType) {
  if (type === 'student') {
    return <Image src={studentImg} alt="student" />
  }
  if (type === 'teacher') {
    return <Image src={teacherImg} alt="teacher" />
  }
  return null
}

function RegisterCard({ type, title }: IRegisterCard) {
  return (
    <Box className="register-card">
      <Box className="register-card__circle"></Box>
      <Box className="register-card___logo" marginBottom={5}>
        {getImageByRegisterType(type)}
      </Box>
      <Typography variant="h5" className="MuiTypography register-card__title">
        {title}
      </Typography>
    </Box>
  )
}

export default RegisterCard
