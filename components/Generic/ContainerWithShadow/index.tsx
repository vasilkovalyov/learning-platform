import React from 'react'
import cn from 'classnames'
import { ContainerWithShadowProps } from './ContainerWithShadow.type'

function ContainerWithShadow({ className, children }: ContainerWithShadowProps) {
  return <div className={cn('container-with-shadow', className)}>{children}</div>
}

export default ContainerWithShadow
