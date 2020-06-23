import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { useTheme } from 'components/Theming'
import Container from 'components/Container'
import Hero from 'components/Hero'
import { rhythm } from '../lib/typography'
import Constants from '../lib/constants'

const Description = styled.p`
  margin-bottom: 10px;
  display: inline-block;
`

export default function Index({ data: { site, allMdx } }) {
  const theme = useTheme()
  const blogPosts = allMdx.edges.filter(
    edge => edge.node.parent.sourceInstanceName === Constants.BLOG,
  )
  let posts = null
  let viewAll = null
  let noPosts = null
  if (blogPosts.length !== 0) {
    posts = blogPosts.map(({ node: post }) => (
      <div
        key={post.id}
        css={css`
          margin-bottom: 40px;
        `}
      >
        <h2
          css={css`
          margin-bottom: ${rhythm(0.3)},
          transition: 'all 150ms ease',
          ':hover': {
            color: ${theme.colors.primary},
          },
        `}
        >
          <Link
            to={`blog/${post.frontmatter.slug}`}
            aria-label={`View ${post.frontmatter.title}`}
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <Description>
          {post.excerpt}{' '}
          <Link
            to={`blog/${post.frontmatter.slug}`}
            aria-label={`View ${post.frontmatter.title}`}
          >
            Read Article →
          </Link>
        </Description>
      </div>
    ))
    viewAll = (
      <Link to="/blog" aria-label="Visit blog page">
        View all articles
      </Link>
    )
  } else {
    noPosts = <h4>No posts to show !, there are coming soon</h4>
  }

  return (
    <Layout site={site}>
      <Hero />
      <Container
        css={css`
          padding-bottom: 0;
        `}
      >
        {posts}
        {viewAll}
        {noPosts}
        <hr />
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
    allMdx(
      limit: 5
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { published: { ne: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 190)
          id
          fields {
            title
            slug
            date
          }
          parent {
            ... on File {
              sourceInstanceName
            }
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
            slug
            keywords
          }
        }
      }
    }
  }
`
