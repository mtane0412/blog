import React from 'react'
import AdSense from 'react-adsense';
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/plugins/command-line/prism-command-line.css'
import SEO from '../components/seo'
import TagList from '../components/taglist'
import PrevNext from '../components/prevnext'
import styled from '@emotion/styled'

const PostHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 1em;
  time {
    display: inline-block;
    margin: 0.25em;
    padding:.25em .5em;
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
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <PostHeader>
              <time dateTime={post.datetime}>{post.publishDate}</time>
              <TagList tags={post.tags} />
            </PostHeader>
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
      dateTime: publishDate
      tags {
        title
        slug
      }
      heroImage {
        file {
          url
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