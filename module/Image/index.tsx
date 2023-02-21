import React from 'react'
import cn from 'classnames'

import { ImageProps } from './Image.type'

function Image({ alt, url, href, target = 'self', className }: ImageProps) {
  if (href) {
    return (
      <a href={href} target={target} className={cn('image-box image-box--linked', className)}>
        <img src={url} alt={alt} className="image-box__image" />
      </a>
    )
  } else {
    return (
      <div className={cn('image-box', className)}>
        <img src={url} alt={alt} className="image-box__image" />
      </div>
    )
  }
}

export default Image
