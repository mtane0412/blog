import React from "react";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";


class TagTemplate extends React.Component {
  render() {
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const tag = get(this, "props.data.contentfulTags");

    return (
      <Layout location={this.props.location}>
        <SEO
          title={`${tag.title}の記事一覧`}
          desc={`「${tag.title}」タグがついた記事一覧`}
          noindex
        />
        <div style={{ background: "#fff", textAlign: 'center' }}>
          <div className="wrapper">
            <h2 className="section-headline">{tag.title}の記事一覧</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                );
              })}
            </ul>
            <Link to="/tags/">タグ一覧へ</Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagTemplate;

export const tagPageQuery = graphql`
  query BlogPostByTagSlug($slug: String!) {
    allContentfulBlogPost(filter: {tags: {elemMatch: {slug: { eq: $slug }}}}) {
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
                    html
                }
            }
          }
        }
      }
    contentfulTags(slug: {eq: $slug}) {
        title
        heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: THUMB) {
                ...GatsbyContentfulFluid_withWebp
            }
        }
    }
}
`
