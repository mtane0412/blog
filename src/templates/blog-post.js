import React from 'react'
import AdSense from 'react-adsense';
import { graphql, Link } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import SEO from '../components/seo'
import PrevNext from '../components/prevnext'
import Iframely from '../components/iframely'
import styled from '@emotion/styled'
import heroStyles from '../components/hero.module.css'

const Tag = styled.span`
  display:inline-block;
  margin-left:1em;
  padding:.25em .5em;
  border: solid 1.5px #373F49;
  border-radius:.5em;
  & > a{
    text-decoration: none;
  }
  &:hover {
    background-color: #ccc;
  }

`

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost');
    const prev = this.props.pageContext.previous;
    const next = this.props.pageContext.next;

    return (
      <Layout location={this.props.location}>
        <SEO
            title={post.title}
            desc={post.description.childMarkdownRemark.excerpt || ' '}
            banner={'https:' + post.heroImage.file.url}
            pathname={post.slug}
            article
          />
        <div style={{ background: '#fff' }}>
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
              {post.tags.map(tag =>
                <Link to={`/tags/${tag.slug}`}><Tag>#{tag.title}</Tag></Link>
              )}
            </p>
            <AdSense.Google
              client='ca-pub-7686072564110741'
              slot='9203727556'
              style={{ display: 'block', textAlign: 'center' }}
              layout='in-article'
              format='fluid'
            />
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <PrevNext prev={prev} next={next} />
            <AdSense.Google
              client='ca-pub-7686072564110741'
              slot='1215564505'
              style={{ display: 'block' }}
              format='auto'
              responsive='true'
            />
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
      publishDate(formatString: "YYYY年MM月DD日")
      tags {
        title
        slug
      }
      heroImage {
        file {
          url
        }
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