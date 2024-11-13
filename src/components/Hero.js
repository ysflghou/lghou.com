import React from 'react'
import { Link } from 'gatsby'
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
        flex-direction: column;
        background-color: ${theme.colors.colorBg};
      `}
    >
      <Avatar src={AvatarSource} />
      <div
        css={css`
          display: flex;
          flex-direction: row;
          margin-top: 10px;
        `}
      >
        <Twitter noThemeToggle />
        <GitHub noThemeToggle />
        <LinkedIn noThemeToggle />
      </div>
      <Container>
        <h2
          css={css`
            font-family: cursive, sans-serif;
            color: ${theme.colors.text};
            position: relative;
            z-index: 5;
            line-height: 1.5;
            margin: auto;
            max-width: ${rhythm(15)};
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
          `}
        >
          Hi, I am Youssef Lghoumaigui, a software engineer from Morocco
          <Link
            css={css`
              border: none;
              color: ${theme.colors.text};
              text-align: center;
              text-decoration: none;
              display: inline-block;
              font-size: 20px;
              cursor: pointer;
            `}
            to="/about"
            activeClassName="active"
            aria-label="View about page"
          >
            <span role="img" aria-label="know more">
              👉
            </span>
            Know more
          </Link>
        </h2>
      </Container>
    </section>
  )
}

export default Hero
