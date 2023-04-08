import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Icon from '../../../components/Generic/Icon'
import { IconEnum } from '../../../components/Generic/Icon/Icon.type'

import colors from '../../../constants/colors'
import getFormatDurationTime from '../../../common/formatDurationTime'

import { BadgeTimeProps } from './BadgeTime.type'

function BadgeTime({ duration, className, startTime, endTime, time }: BadgeTimeProps) {
  return (
    <Box className={cn('badge badge--time', className)} style={{ backgroundColor: colors.primary_light_color }}>
      <Icon icon={IconEnum.CLOCK_CIRCULAR_OUTLINE} size={15} color={colors.primary_color} className="badge__icon" />
      <Typography className="MuiTypography badge__text font-semibold">
        {time ? time : null}
        {duration ? getFormatDurationTime(duration) : null}
        {startTime && endTime ? (
          <span>
            {startTime} - {endTime}
          </span>
        ) : null}
      </Typography>
    </Box>
  )
}

export default BadgeTime
