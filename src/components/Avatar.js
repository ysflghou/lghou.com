import React from 'react'
import { css } from '@emotion/core'

const Avatar = ({ src, width, height }) => {
  return (
    <img
      css={css`
        border-radius: 50%;
        height: ${height ? height : 160}px;
        width: ${width ? width : 160}px;
        border: 4px solid #fff;
        /* -webkit-filter: grayscale(100%);
        filter: grayscale(100%); */
        margin: auto;
      `}
      src={src}
      alt="t's me! don't worry you can see me later"
    />
  )
}

export default Avatar
