import React from "react";
import { graphql} from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ArticlePreview from "../components/article-preview";
import ArchivePagenation from "../components/archive-pagenation"

class ArchiveTemplate extends React.Component {
  render() {
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const totalCount = get(this, "props.data.allContentfulBlogPost.totalCount");
    const {thisYear, thisMonth, prevPage, nextPage} = this.props.pageContext;

    return (
      <Layout location={this.props.location}>
        <SEO
          title={thisMonth ? `${thisYear}年${thisMonth}月の記事一覧` : `${thisYear}年の記事一覧`}
          desc={thisMonth ? `${thisYear}年${thisMonth}月の記事一覧` : `${thisYear}年の記事一覧`}
          noindex
        />
        <div style={{ background: "#fff", textAlign: 'center' }}>
          <div className="wrapper">
            <h2 className="section-headline">{thisMonth ? `${thisYear}年${thisMonth}月の記事一覧` : `${thisYear}年の記事一覧`} ({totalCount}件)</h2>
            <ul className="article-list">
              {posts.map(({ node }) => {
                return (
                  <li key={node.slug}>
                    <ArticlePreview article={node} />
                  </li>
                );
              })}
            </ul>
            <ArchivePagenation prevPage={prevPage}  nextPage={nextPage} thisMonth={thisMonth} thisYear={thisYear} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default ArchiveTemplate;

export const archivePageQuery = graphql`
  query BlogPostsByDate($periodStartDate: Date!, $periodEndDate: Date!) {
    allContentfulBlogPost(filter: {publishDate: {gte: $periodStartDate, lte: $periodEndDate}}) {
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
        totalCount
      }
}
`
