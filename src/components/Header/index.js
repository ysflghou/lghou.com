import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import { useTheme } from '../Theming'
import { bpMaxSM } from '../../lib/breakpoints'
import MobileMenu from './MobileMenu'
import Links from './Links'

import Container from '../Container'

const Header = () => {
  const theme = useTheme()
  const logoSource = require('../../../static/images/logo.png')
  return (
    <header
      css={css`
        width: 100%;
        flex-shrink: 0;
        background: none;
        padding: 20px 0;
        background-color: ${theme.colors.colorBg};
      `}
    >
      <Container noVerticalPadding>
        <nav
          css={css`
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <Link
            to="/"
            aria-label="Go to homepage"
            css={css`
              color: ${theme.colors.text};
              &:hover {
                color: white;
                text-decoration: none;
              }
            `}
          >
            <img
              css={css`
                border-radius: 50%;
                background-color: white;
                height: 65px;
                width: 65px;
                border: 4px solid black;
                /* -webkit-filter: grayscale(100%);
                filter: grayscale(100%); */
                margin: auto;
              `}
              src={logoSource}
              alt="t's me! don't worry you can see me later"
            />
          </Link>
          <div
            css={css`
              font-size: 16px;
              line-height: 1.25;
              display: flex;
              align-items: center;
              a {
                text-decoration: none;
                color: ${theme.colors.text};
                margin-left: 16px;
                margin-right: 16px;
              }
              .active {
                display: none;
                visibility: hidden;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                ${bpMaxSM} {
                  display: none;
                }
              `}
            >
              <Links />
            </div>
            <MobileMenu>
              <Links />
            </MobileMenu>
          </div>
        </nav>
      </Container>
    </header>
  )
}

const ConnectedHeader = props => <Header {...props} />

export default ConnectedHeader
