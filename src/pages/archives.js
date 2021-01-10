import React from "react";
import { graphql, Link } from "gatsby";
import get from "lodash/get";
import styled from '@emotion/styled'
import Layout from "../components/layout";
import SEO from "../components/seo";

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  border: 1px solid #ccc;
  margin: 1em;
  vertical-align: middle;
  align-items: center;
  h3 {
    display: block;
    flex: 2;
    margin: 0;
    padding: 0;
    a {
      text-decoration: none;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    flex: 2;
    li {
      display: block;
      background-color: #eee;
      border-radius: 10px;
      margin: .25em;
      a {
        display: block;
        padding: .5em;
        border-radius: 10px;
        width: 100%;
        height: 100%;
        &:hover {
          background-color: #ccc;
        }
      }
    }
  }
`

class ArchivesIndex extends React.Component {
  render() {
    const posts = get(this, "props.data.allContentfulBlogPost.edges");
    const totalCounts = {};
    const years = new Set();
    const yearMonths = new Set();

    posts.forEach(post => {
      const { year, yearMonth } = post.node;

      // 年別、月別のtotalCountを追加
      if (!totalCounts.hasOwnProperty(year)) totalCounts[year] = 0;
      if (!totalCounts.hasOwnProperty(yearMonth)) totalCounts[yearMonth] = 0;
      totalCounts[year] += 1;
      totalCounts[yearMonth] += 1;

      // years, yearMonths Set作成
      years.add(year);
      yearMonths.add(yearMonth);

    })

    const yearList = Array.from(years);
    const yearMonthList = Array.from(yearMonths);

    return (
      <Layout location={this.props.location}>
        <SEO title="Archives" desc="年月別アーカイブページ" noindex />
        <div style={{ background: "#fff", textAlign: "center" }}>
          <div className="wrapper">
            <h2 className="section-headline">Archives</h2>
            {yearList.map(year => {
              return (
                <Box key={`box${year}`}>
                  <h3 key={`header${year}`}><Link to={`/archives/${year}/`}>{year}年 ({totalCounts[year]})</Link></h3>
                  <ul key={`list${year}`}>
                    {yearMonthList.map(yearMonth => {
                      if (year === yearMonth.split('/')[0]) {
                        return (
                          <li key={yearMonth}>
                            <Link to={`/archives/${yearMonth}/`}>{yearMonth} ({totalCounts[yearMonth]})</Link>
                          </li>
                        )
                      }
                    })}
                  </ul>
                </Box>
              )
            })}
            <Link to={`../`}>HOME</Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default ArchivesIndex;

export const pageQuery = graphql`
  query ArchiveIndexQuery {
    allContentfulBlogPost(sort: {fields: publishDate, order: DESC}) {
      edges {
        node {
          year: publishDate(formatString: "YYYY")
          yearMonth: publishDate(formatString: "YYYY/MM")
        }
      }
    }
  }
`;
