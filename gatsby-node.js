const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const tagTemplate = path.resolve('./src/templates/tag-template.js')
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost(sort: {fields: publishDate, order: ASC}) {
              edges {
                node {
                  title
                  slug
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
        posts.forEach(post => {
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
