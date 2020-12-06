require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const contentfulConfig = {
  spaceId: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
};

// if you want to use the preview API please define
// CONTENTFUL_HOST in your environment config
// the `host` property should map to `preview.contentful.com`
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/spaces/space/get-a-space/console/js
if (process.env.CONTENTFUL_HOST) {
  contentfulConfig.host = process.env.CONTENTFUL_HOST;
}

const { spaceId, accessToken } = contentfulConfig;

// SiteMetadata
const pathPrefix = '/';
const title = '初歩からの無職';
const titleAlt = '初歩からの無職';
const description = 'mtane0412の日記';
const url = 'https://mtane0412.com';
const siteUrl = 'https://mtane0412.com\/';
const siteLanguage = 'ja';
const logo = 'static/logo.png';
const banner = 'static/logo.png';
const favicon = 'static/favicon.png';
const shortName = 'mtane0412blog';
const author = 'mtane0412';
const themeColor = '#3e7bf';
const backgroundColor = '#d3e0f';
const twitter = '@mtane0412';

if (!spaceId || !accessToken) {
  throw new Error(
    "Contentful spaceId and the access token need to be provided."
  );
}

module.exports = {
  siteMetadata: {
    pathPrefix: pathPrefix,
    title: title,
    titleAlt: titleAlt,
    description: description,
    url: url,
    siteUrl: siteUrl,
    siteLanguage: siteLanguage,
    logo: logo,
    banner: banner,
    favicon: favicon,
    shortName: shortName,
    author: author,
    themeColor: themeColor,
    backgroundColor: backgroundColor,
    twitter: twitter,
  },
  // pathPrefix: "/gatsby-contentful-starter",
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-58041716-1",
        head: true,
        cookieDomain: "mtane0412.com",
      },
    },
    {
      resolve: `gatsby-plugin-google-adsense`,
      options: {
        publisherId: `ca-pub-7686072564110741`
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              services: {
                Instagram: {
                  accessToken: process.env.INSTAGRAM_ACCESS_TOKEN,
                },
              },
            },
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-contentful`,
      options: contentfulConfig,
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-instagram-embed`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: title,
        short_name: shortName,
        description: description,
        start_url: pathPrefix,
        background_color: backgroundColor,
        theme_color: themeColor,
        display: 'standalone',
        icon: favicon,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`
  ],
};
