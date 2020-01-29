import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import Footer from './footer'

const styles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Roboto Mono, monospace;
  }
`

const Layout = ({ children, maxWidth }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <Global styles={styles} />
      <div
        style={{
          margin: `0 auto`,
          maxWidth: maxWidth || 1200,
          marginBottom: '128px'
        }}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  maxWidth: PropTypes.number
}

export default Layout
