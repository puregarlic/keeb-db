import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const FooterBase = styled.div`
  width: 100%;
  padding: 0 48px;
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background: #333;
  color: white;

  @media screen and (max-width: 676px), screen and (max-height: 676px) {
    position: unset;
    flex-direction: column;
    min-height: 192px;
    justify-content: space-evenly;
  }
`

const Footer = () => (
  <FooterBase>
    <span>Built by PureGarlic</span>
    <Link to="/disclaimers" style={{ color: 'white' }}>
      Disclaimers
    </Link>
  </FooterBase>
)

export default Footer
