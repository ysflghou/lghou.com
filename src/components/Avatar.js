import React from 'react'
import { css } from '@emotion/core'

const Avatar = ({ src }) => {
  return (
    <img
      css={css`
        border-radius: 50%;
        height: 160px;
        width: 160px;
        border: 4px solid #fff;
        /* -webkit-filter: grayscale(100%);
        filter: grayscale(100%); */
        margin: auto;
      `}
      src={src}
      alt="it's me! don't worry you can see me later"
    />
  )
}

export default Avatar
