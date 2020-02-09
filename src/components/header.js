import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import styled from '@emotion/styled'

const HeaderLayout = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 64px;
  min-height: 128px;

  @media screen and (max-width: 520px) {
    padding: 0 10vw;
    flex-direction: column;
    justify-content: space-evenly;
    min-height: 192px;
  }
`

const SubmitButton = styled(Link)`
  margin-left: 48px;
  display: block;
  appearance: none;
  border: none;
  outline: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 700;
  background: #fff;
  color: #333;
  text-decoration: none;
  border: 3px solid #333;
  box-shadow: 8px 8px 0 aquamarine;
  transform: translate(-4px, -4px);
  transition: 0.1s ease-in-out;

  &:hover {
    transform: translate(-2px, -2px);
    box-shadow: 6px 6px 0 aquamarine;
  }

  &:active {
    transform: translate(4px, 4px);
    box-shadow: none;
  }
`

const Header = ({ siteTitle }) => {
  return (
    <>
      <div id="announcement-root" style={{ width: '100%' }} />
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <SubmitButton to="/submit">Submit</SubmitButton>
        </div>
      </HeaderLayout>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ``
}

export default Header
