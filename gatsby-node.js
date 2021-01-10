const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tag-template.js')
    const archiveTemplate = path.resolve('./src/templates/archive-template.js')

    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(sort: {fields: publishDate, order: ASC}) {
              edges {
                node {
                  title
                  slug
                  year: publishDate(formatString: "YYYY")
                  month: publishDate(formatString: "MM")
                }
                next {
                  title
                  slug
                }
                previous {
                  title
                  slug
                }
              }
            }
            allContentfulTags {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allContentfulBlogPost.edges;
        const years = new Set();
        const yearMonths = new Set();

        posts.forEach(post => {
          const { year, month } = post.node;

          years.add(year);
          yearMonths.add(`${year}/${month}`);

          createPage({
            path: `/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug,
              next: post.next,
              previous: post.previous
            },
          })
        })

        // 年別ページ
        const yearList = Array.from(years)
        let prevYear;
        yearList.forEach((year, index)  => {
          const nextYear = yearList[index + 1];
          createPage({
            path: `/archives/${year}/`,
            component: archiveTemplate,
            context: {
              thisYear: year,
              prevPage: prevYear,
              nextPage: nextYear,
              periodStartDate: `${year}-01-01T00:00:00.000Z`,
              periodEndDate: `${year}-12-31T23:59:59.999Z`
            }
          })
          prevYear = year
        })

        // 月別ページ
        const yearMonthList = Array.from(yearMonths);
        let prevYearMonth;
        yearMonthList.forEach((yearMonth, index) => {
          const [year, month] = yearMonth.split('/')
          const nextYearMonth = yearMonthList[index + 1];
          const startDate = `${year}-${month}-01T00:00:00.000Z`;
          const newStartDate = new Date(startDate);
          // 月末日を取得
          const endDate = new Date(new Date(newStartDate.setMonth(newStartDate.getMonth() + 1)).getTime() - 1).toISOString();
          createPage({
            path: `/archives/${year}/${month}/`,
            component: archiveTemplate,
            context: {
              thisYear: year,
              thisMonth: month,
              prevPage: prevYearMonth,
              nextPage: nextYearMonth,
              periodStartDate: startDate,
              periodEndDate: endDate
            }
          })
          prevYearMonth = yearMonth;
        })

        // タグページ
        const tags = result.data.allContentfulTags.edges;
        tags.forEach(tag => {
          createPage({
            path: `tags/${tag.node.slug}/`,
            component: tagTemplate,
            context: {
              slug: tag.node.slug
            },
          })
        })
      })
    )
  })
}
