import React from 'react'
import cn from 'classnames'
import { IShadowContainerProps } from './ShadowContainer.type'

function ShadowContainer({ children, className }: IShadowContainerProps) {
  return <div className={cn('aside-component-container', className)}>{children}</div>
}

export default ShadowContainer
