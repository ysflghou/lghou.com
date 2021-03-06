import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { css } from '@emotion/core'
import Container from 'components/Container'
import SEO from '../components/SEO'
import Layout from '../components/Layout'
import Link from '../components/Link'
import { bpMaxSM, bpMaxMD } from '../lib/breakpoints'
import Constants from '../lib/constants'

const Blog = ({
  data: { site, allMdx },
  pageContext: { pagination, categories },
}) => {
  const { page, nextPagePath, previousPagePath } = pagination

  const postsEdges = allMdx.edges.filter(
    edge => edge.node.parent.sourceInstanceName === Constants.BLOG,
  )
  const posts = page
    .map(id => postsEdges.find(edge => edge.node.id === id))
    .filter(post => post !== undefined)

  return (
    <Layout site={site}>
      <SEO />
      <Container noVerticalPadding>
        {posts.map(({ node: post }) => (
          <div
            key={post.id}
            css={css`
              :not(:first-of-type) {
                margin-top: 60px;
                ${bpMaxMD} {
                  margin-top: 40px;
                }
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              :first-of-type {
                margin-top: 20px;
                ${bpMaxSM} {
                  margin-top: 20px;
                }
              }
              .gatsby-image-wrapper {
              }
              ${bpMaxSM} {
                padding: 20px;
              }
              display: flex;
              flex-direction: column;
            `}
          >
            {post.frontmatter.banner && (
              <div
                css={css`
                  padding: 60px 60px 40px 60px;
                  ${bpMaxSM} {
                    padding: 20px;
                  }
                `}
              >
                <Link
                  aria-label={`View ${post.frontmatter.title} article`}
                  to={`blog/${post.fields.slug}`}
                >
                  <Img
                    css={css`
                      border-radius: 0.5em;
                      border: 1px black solid;
                      overflow: hidden;
                    `}
                    sizes={post.frontmatter.banner.childImageSharp.fluid}
                  />
                </Link>
              </div>
            )}
            <h2
              css={css`
                margin-top: 30px;
                margin-bottom: 10px;
              `}
            >
              <Link
                aria-label={`View ${post.frontmatter.title} article`}
                to={`blog/${post.fields.slug}`}
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            <small>{post.frontmatter.date}</small>
            <p
              css={css`
                margin-top: 10px;
              `}
            >
              {post.excerpt}
            </p>{' '}
            <Link
              to={`blog/${post.fields.slug}`}
              aria-label={`view "${post.frontmatter.title}" article`}
            >
              Read Article →
            </Link>
          </div>
        ))}
        <div css={css({ marginTop: '30px' })}>
          {nextPagePath && (
            <Link to={nextPagePath} aria-label="View next page">
              Next Page →
            </Link>
          )}
          {previousPagePath && (
            <Link to={previousPagePath} aria-label="View previous page">
              ← Previous Page
            </Link>
          )}
        </div>
        <hr
          css={css`
            margin: 50px 0;
          `}
        />
      </Container>
    </Layout>
  )
}

export default Blog

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { isPost: { eq: true } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 150)
          id
          parent {
            ... on File {
              name
              sourceInstanceName
            }
          }
          fields {
            title
            slug
            date
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            banner {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_withWebp_tracedSVG
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
