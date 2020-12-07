import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PrevNext from '../components/prevnext'
import Iframely from '../components/iframely'

import heroStyles from '../components/hero.module.css'


class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const prev = this.props.pageContext.previous
    const next = this.props.pageContext.next
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <SEO
            title={post.title}
            desc={post.description.childMarkdownRemark.excerpt || ' '}
            image={post.heroImage.fluid}
            pathname={post.slug}
            article
          />
          <div className={heroStyles.hero}>
            <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            />
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {post.publishDate}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <PrevNext prev={prev} next={next} />
          </div>
        </div>
        <Iframely />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      slug
      body {
        childMarkdownRemark {
          html
        }
      }
      description {
        childMarkdownRemark {
          excerpt
        }
      }
    }
  }
`