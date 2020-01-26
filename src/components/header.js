import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 64px;
  min-height: 80px;
`

const Header = ({ siteTitle }) => (
  <HeaderLayout>
    <h3 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: '#333',
          textDecoration: `none`
        }}>
        {siteTitle}
      </Link>
    </h3>
    <div>
      <h4 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: '#333',
            textDecoration: 'none'
          }}
          activeStyle={{
            textDecoration: 'underline'
          }}>
          Group Buys
        </Link>
      </h4>
    </div>
  </HeaderLayout>
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
