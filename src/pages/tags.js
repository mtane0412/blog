import React from "react";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import SEO from "../components/seo";

class TagsIndex extends React.Component {
  render() {
    const tags = get(this, "props.data.allContentfulTags.edges");
    const tagsGroup = get(this, "props.data.allContentfulBlogPost.group");
    const tagsCount = Object.assign(...tagsGroup.map(({fieldValue, totalCount}) => ({[fieldValue]: totalCount})));

    return (
      <Layout location={this.props.location}>
        <SEO title="タグ一覧" desc="タグ一覧ページ" noindex />
        <div style={{ background: "#fff", textAlign: "center" }}>
          <div className="wrapper">
            <h2 className="section-headline">Tags</h2>
            <ul className="article-list">
              {tags.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <Link to={node.slug}>{node.title} ({tagsCount[node.slug]})</Link>
                  </li>
                );
              })}
            </ul>
            <Link to={`../`}>HOME</Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default TagsIndex;

export const pageQuery = graphql`
  query TagIndexQuery {
    allContentfulBlogPost {
      group(field: tags___slug) {
        fieldValue
        totalCount
      }
    }
    allContentfulTags {
      edges {
        node {
          slug
          title
          blog_post {
            slug
          }
        }
      }
    }
  }
`;
