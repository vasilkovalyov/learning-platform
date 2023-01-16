import React from 'react'
import Image from 'next/image'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Icon from '../../components/Generic/Icon'
import { IconEnum } from '../../components/Generic/Icon/Icon.type'

import { TeacherPaidCardProps } from './TeacherPaidCard.type'

import colors from '../../constants/colors'
import { formatDate } from '../../common/formatDate'

function TeacherPaidCard({ dateTimestamp, fullname, image }: TeacherPaidCardProps) {
  const [hour, minute] = new Date(dateTimestamp).toISOString().split('T')[1].split(':')

  return (
    <Box className="teacher-paid-card">
      <Box className="teacher-paid-card__image">
        <Image src={image.src} alt={image.alt} />
      </Box>
      <Box className="teacher-paid-card__body">
        <Typography variant="subtitle2" className="MuiTypography color-grey-3">
          <Icon
            icon={IconEnum.CLOCK_CIRCULAR_OUTLINE}
            size={14}
            color={colors.grey_color3}
            className="teacher-paid-card__icon"
          />
          <span>
            {hour}:{minute}, {formatDate(new Date(dateTimestamp), 'DD MMM YYYY')}
          </span>
        </Typography>
        <Typography variant="subtitle2" className="MuiTypography font-semibold">
          {fullname}
        </Typography>
      </Box>
    </Box>
  )
}

export default TeacherPaidCard
