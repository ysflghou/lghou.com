import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import Layout from 'components/Layout'
import Link from 'components/Link'
import Container from 'components/Container'

export default ({ data: { site } }) => {
  return (
    <Layout site={site}>
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        <hr />
        <div>
          <h1>NOT FOUND</h1>
          <p>You just hit a route that doesn't exist... the sadness.</p>
          <p>
            Go back &nbsp;
            <Link to="/" aria-label="Home page">
              Home
            </Link>{' '}
            then
          </p>
        </div>
      </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      ...site
      siteMetadata {
        title
      }
    }
  }
`
