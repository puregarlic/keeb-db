require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `Keeb DB`,
    description: `Interactive archive dedicated to cataloging the mechanical keyboards community.`,
    author: `@puregarlic_`,
    siteUrl: `https://keeb.center`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GA_TRACKING_ID,
        anonymize: true,
        head: true
      }
    },
    `gatsby-plugin-layout`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'images',
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: 'Fauna',
        fieldName: 'fauna',
        url: 'https://graphql.fauna.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_TOKEN}`
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        defaultLayouts: {
          pages: require.resolve('./src/layouts/narrow.js')
        }
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Keeb DB`,
        short_name: `Keeb DB`,
        start_url: `/`,
        background_color: `#FFF`,
        theme_color: `#7FFFD4`,
        display: `minimal-ui`,
        icon: `src/images/icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: ['roboto mono:400,500,700'],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-plugin-fullstory`,
      options: {
        fs_org: process.env.FULLSTORY_ORG
      }
    },
    `gatsby-plugin-theme-ui`,
    ...(process.env.NODE_ENV !== 'production'
      ? [
          {
            resolve: `gatsby-plugin-page-creator`,
            options: {
              path: `${__dirname}/src/private`
            }
          }
        ]
      : [])
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
