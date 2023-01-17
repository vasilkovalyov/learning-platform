import React from 'react'
import cn from 'classnames'

import Box from '@mui/material/Box'

import Icon from '../../../components/Generic/Icon'
import { IconEnum } from '../../../components/Generic/Icon/Icon.type'

import colors from '../../../constants/colors'

import { BadgeExperienceProps } from './BadgeExperience.type'

function BadgeExperience({ years, className }: BadgeExperienceProps) {
  return (
    <Box className={cn('badge badge-experience', className)} style={{ backgroundColor: colors.yellow_light_color }}>
      <Icon icon={IconEnum.STAR_EMPTY} size={15} color={colors.yellow_color} className="badge__icon" />
      <span className="badge__text">Expirience: {years}</span>
    </Box>
  )
}

export default BadgeExperience
