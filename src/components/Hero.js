import React from 'react'
import { css } from '@emotion/core'
import { useTheme } from './Theming'
import Container from './Container'
import Avatar from './Avatar'
import { Twitter, GitHub, LinkedIn } from './Social'
import { rhythm } from '../lib/typography'

const Hero = () => {
  const theme = useTheme()
  const AvatarSource = require('../../static/images/lghou.jpg')
  return (
    <section
      css={css`
        color: ${theme.colors.white};
        width: 100%;
        background: ${theme.colors.primary};
        padding: 20px 0 30px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: linear-gradient(
          to right,
          rgb(33, 57, 190),
          rgb(142, 63, 182)
        );
      `}
    >
      <Avatar
        src={AvatarSource}
        css={css`
          display: flex;
          flex-direction: column;
        `}
      />
      <Twitter />
      <GitHub />
      <LinkedIn />
      <Container
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <h2
          css={css`
            color: ${theme.colors.white};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin: 0;
            max-width: ${rhythm(15)};
          `}
        >
          Your blog says the things you want to say. Indeed
        </h2>
      </Container>
      <div
        css={css`
          height: 150px;
          overflow: hidden;
        `}
      />
    </section>
  )
}

export default Hero
