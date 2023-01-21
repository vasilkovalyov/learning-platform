import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Icon from 'components/Generic/Icon'
import { IconEnum } from 'components/Generic/Icon/Icon.type'

import { ModalCardProps } from './ModalPopupBoxFull.type'

function ModalCardFull({ children, onHandleClose }: ModalCardProps) {
  return (
    <Box className="modal-card-full" alignItems="center" justifyContent="center">
      <Button className="modal-card-full__button-close" onClick={onHandleClose}>
        <Icon icon={IconEnum.CROSS_OUTLINE} size={20} color="#000000" className="modal-card-full__button-close-icon" />
      </Button>
      <Box className="modal-card-full__body">{children}</Box>
    </Box>
  )
}

export default ModalCardFull
