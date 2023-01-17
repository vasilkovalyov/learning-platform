import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import Icon from '../../../components/Generic/Icon'
import { IconEnum } from '../../../components/Generic/Icon/Icon.type'

import colors from '../../../constants/colors'

import { BadgeAgesProps } from './BadgeAges.type'

function BadgeAges({ ages, className }: BadgeAgesProps) {
  return (
    <Box className={cn('badge badge--ages', className)} style={{ backgroundColor: colors.green_light_color }}>
      <Icon icon={IconEnum.PERSON} size={15} color={colors.green_color} className="badge__icon" />
      <Typography className="MuiTypography badge__text font-semibold">{ages} ages</Typography>
    </Box>
  )
}

export default BadgeAges
