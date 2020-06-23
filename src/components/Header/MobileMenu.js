import React, { useState } from 'react'
import { css } from '@emotion/core'
import Container from '../Container'

import { bpMaxSM } from '../../lib/breakpoints'

import { useTheme } from '../Theming'

const Toggle = ({ children }) => {
  const [isToggledOn, setToggle] = useState(false)
  const toggle = () => setToggle(!isToggledOn)
  const theme = useTheme()
  const white = theme.colors.white
  const black = theme.colors.black
  const isDefaultMode = theme.themeName === 'default'

  return (
    <div
      css={css`
        display: none;
        visibility: hidden;
        ${bpMaxSM} {
          display: block;
          visibility: visible;
        }
      `}
    >
      <button
        onClick={toggle}
        aria-label={`${isToggledOn ? 'close menu' : 'open menu'}`}
        css={css`
          z-index: 30;
          top: -5px;
          left: -5px;
          position: relative;
          background: transparent;
          border: none;
          :hover:not(.touch),
          :focus {
            background: transparent;
            border: none;
            outline: none;
          }
        `}
      >
        <div
          css={css`
            width: 30px;
            height: 2px;
            background: ${isDefaultMode ? black : white};
            position: absolute;
            left: -20px;
            ${isToggledOn
              ? 'background: transparent'
              : `background: ${isDefaultMode ? black : white};`};
            transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
            ::before {
              content: '';
              top: -8px;
              width: 30px;
              height: 2px;
              background: ${isDefaultMode ? black : white};
              position: absolute;
              left: 0;
              ${isToggledOn
                ? 'transform: rotate(45deg); top: 0; '
                : 'transform: rotate(0)'};
              transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
            }
            ::after {
              top: 8px;
              content: '';
              width: 30px;
              height: 2px;
              background: ${isDefaultMode ? black : white};
              position: absolute;
              left: 0;
              ${isToggledOn
                ? 'transform: rotate(-45deg); top: 0;'
                : 'transform: rotate(0)'};
              transition: all 250ms cubic-bezier(0.86, 0, 0.07, 1);
            }
          `}
        />
      </button>
      {isToggledOn && (
        <div
          css={css`
            position: absolute;
            z-index: 20;
            left: 0;
            top: 0;
            width: 100vw;
            height: 30vh;
            display: flex;
            align-items: center;
            background-color: ${theme.colors.colorBg};
          `}
        >
          <Container
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              a {
                color: ${theme.colors.text};
                font-size: 22px;
                margin: auto;
                padding: 10px;
                border-radius: 5px;
                :hover {
                  background: rgba(0, 0, 0, 0.2);
                }
              }
              .active {
                background: rgba(0, 0, 0, 0.2);
              }
            `}
          >
            {children}
          </Container>
        </div>
      )}
    </div>
  )
}

export default Toggle
