import React from 'react'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '../components/header'
import Footer from '../components/footer'

const styles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Roboto Mono, monospace;
  }
`

const Layout = ({ children }) => {
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
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '128px'
        }}>
        {children}
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default Layout
