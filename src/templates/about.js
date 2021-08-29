import React from 'react'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import SEO from 'components/SEO'
import { css } from '@emotion/core'
import Container from 'components/Container'
import Layout from '../components/Layout'
import Avatar from '../components/Avatar'
// import { useTheme } from '../components/Theming'

import { Twitter, GitHub, LinkedIn } from '../components/Social'

export default function Post({ data: { site, mdx } }) {
  const AvatarSource = require('../../static/images/lghou.jpg')
  // const theme = useTheme()
  // console.log(theme.themeName)

  return (
    <Layout site={site} frontmatter={mdx.frontmatter} isAboutpage>
      <SEO frontmatter={mdx.frontmatter} isBlogPost />
      <Avatar src={AvatarSource} width="200" height="200" />
      <article
        css={css`
          width: 100%;
          display: flex;
        `}
      >
        <Container>
          <div
            css={css`
              text-align: center;
              padding: 10px;
            `}
          >
            <Twitter />
            <GitHub />
            <LinkedIn />
          </div>

          <h2
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            Hi, I am Youssef
          </h2>
          <br />
          <MDXRenderer
            css={css`
              text-align: center;
              margin-bottom: 20px;
            `}
          >
            {mdx.body}
          </MDXRenderer>
        </Container>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    site {
      ...site
    }
    mdx(fields: { id: { eq: $id } }) {
      fields {
        title
        slug
        date
      }
      frontmatter {
        title
        slug
        keywords
      }
      body
    }
  }
`
