import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'

import Icon from '../../../components/Generic/Icon'
import { IconEnum } from '../../../components/Generic/Icon/Icon.type'

import colors from '../../../constants/colors'
import { formatDate } from '../../../common/formatDate'

import { BadgeDateProps } from './BadgeDate.type'

function BadgeDate({ date, className }: BadgeDateProps) {
  return (
    <Box className={cn('badge badge--date', className)} style={{ backgroundColor: colors.green_light_color }}>
      <Icon icon={IconEnum.CALENDAR} size={15} color={colors.green_color} className="badge__icon" />
      <span className="badge__text">{formatDate(new Date(date), 'DD MMM YYYY')}</span>
    </Box>
  )
}

export default BadgeDate
