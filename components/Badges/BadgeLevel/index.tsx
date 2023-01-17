import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Icon from '../../../components/Generic/Icon'
import { IconEnum } from '../../../components/Generic/Icon/Icon.type'

import colors from '../../../constants/colors'

import { BadgeLevelProps } from './BadgeLevel.type'

function BadgeLevel({ level, className }: BadgeLevelProps) {
  return (
    <Box className={cn('badge badge--level', className)} style={{ backgroundColor: colors.green_light_color }}>
      <Icon icon={IconEnum.UNIVARSTY_HAT} size={15} color={colors.green_color} className="badge__icon" />
      <Typography className="MuiTypography badge__text font-semibold">{level}</Typography>
    </Box>
  )
}

export default BadgeLevel
