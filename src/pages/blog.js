import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import styled from '@emotion/styled'
import Layout from '../components/layout'
import SEO from '../components/seo'
import ArticlePreview from '../components/article-preview'


const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 61.8vh;
  max-height: 400px;
  background: #e1e1e1;
  font-size: 2em;
  overflow: hidden;
`

class BlogIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    return (
      <Layout location={this.props.location}>
        <SEO />
        <div style={{ background: '#fff' }}>
          <Hero>Blog</Hero>
          <div className="wrapper">
            <h2 className="section-headline">Recent articles</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "YYYY年MM月DD日")
          tags {
            title
            slug
          }
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: THUMB) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
          description {
            childMarkdownRemark {
              excerpt
            }
          }
        }
      }
    }
  }
`
