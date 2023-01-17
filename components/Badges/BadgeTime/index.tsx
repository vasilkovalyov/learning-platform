import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'

import Icon from '../../../components/Generic/Icon'
import { IconEnum } from '../../../components/Generic/Icon/Icon.type'

import colors from '../../../constants/colors'
import getFormatDurationTime from '../../../common/formatDurationTime'

import { BadgeTimeProps } from './BadgeTime.type'

function BadgeTime({ duration, className, startTime, endTime }: BadgeTimeProps) {
  return (
    <Box className={cn('badge badge--time', className)} style={{ backgroundColor: colors.primary_light_color }}>
      <Icon icon={IconEnum.CLOCK_CIRCULAR_OUTLINE} size={15} color={colors.primary_color} className="badge__icon" />
      {duration ? <span className="badge__text">{getFormatDurationTime(duration)}</span> : null}
      {startTime && endTime ? (
        <span>
          {startTime} - {endTime}
        </span>
      ) : null}
    </Box>
  )
}

export default BadgeTime
