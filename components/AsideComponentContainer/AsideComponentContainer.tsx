import React from 'react'
import cn from 'classnames'
import { IAsideComponentContainerProps } from './AsideComponentContainer.type'

function AsideComponentContainer({ children, className }: IAsideComponentContainerProps) {
  return <div className={cn('aside-component-container', className)}>{children}</div>
}

export default AsideComponentContainer
