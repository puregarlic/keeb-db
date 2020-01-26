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
  height: 3em;
  background: #333;
  color: white;
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
