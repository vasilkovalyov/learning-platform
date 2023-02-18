import React from 'react'

import { ImageProps } from './Image.type'

function Image({ alt, url, href, target = 'self' }: ImageProps) {
  if (href) {
    return (
      <a href={href} target={target} className="image-box image-box--linked">
        <img src={url} alt={alt} className="image-box__image" />
      </a>
    )
  } else {
    return (
      <div className="image-box">
        <img src={url} alt={alt} className="image-box__image" />
      </div>
    )
  }
}

export default Image
