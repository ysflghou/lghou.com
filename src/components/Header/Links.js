import React from 'react'
import { Link } from 'gatsby'
import { useTheme } from '../Theming'
import ThemeToggler from './ThemeToggler'

export default () => {
  const theme = useTheme()
  return (
    <React.Fragment>
      <Link to="/blog" activeClassName="active" aria-label="View blog page">
        Blog
      </Link>
      <Link to="/about" activeClassName="active" aria-label="View about page">
        About
      </Link>
      <Link
        to="/cantact"
        activeClassName="active"
        aria-label="View contact page"
      >
        Contact
      </Link>

      <ThemeToggler
        css={{}}
        toggleTheme={theme.toggleTheme}
        themeName={theme.themeName}
      />
    </React.Fragment>
  )
}
