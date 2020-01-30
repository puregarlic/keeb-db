import React from 'react'
import styled from '@emotion/styled'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import usePortal from '../hooks/use-portal'

const ShadeBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  opacity: ${props => props.opacity};
  background: ${props => props.background};
  transition: 0.1s ease-in-out;
  backdrop-filter: blur(5px);
`

const Shade = ({ color, opacity, onClick }) => {
  const target = usePortal('shade-root')

  return createPortal(
    <ShadeBase background={color} opacity={opacity} onClick={onClick} />,
    target
  )
}

Shade.propTypes = {
  color: PropTypes.string,
  opacity: PropTypes.number,
  onClick: PropTypes.func
}

Shade.defaultProps = {
  color: '#fff',
  opacity: 0.5
}

export default Shade
