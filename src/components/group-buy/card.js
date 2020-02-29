import React, { forwardRef } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

const Content = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  transition: 0.1s ease-in-out;
  border-width: 3px;
  border-style: solid;
  border-color: ${props => props.theme.colors.text};
  background: ${props => props.theme.colors.background};
`

const Container = styled(motion.div)`
  width: 300px;
  height: 320px;
  margin: 0 auto;
  overflow: hidden;
  z-index: ${props => (props.active ? '2' : '0')};
  box-sizing: border-box;

  &:hover {
    z-index: 2;
  }

  & > ${Content} {
    transform: ${props => (props.active ? 'translate(-8px, -8px)' : 'none')};
  }

  &:hover > ${Content} {
    transform: translate(-8px, -8px);
  }
`

const Shadow = styled.div`
  position: absolute;
  width: inherit;
  height: inherit;
  background: ${props => props.color || 'gainsboro'};
`

const variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

const Card = forwardRef((props, ref) => {
  return (
    <Container
      active={props.active}
      ref={ref}
      positionTransition
      variants={variants}>
      <Shadow color={props.color} />
      <Content>{props.children}</Content>
    </Container>
  )
})

Card.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
  active: PropTypes.bool
}

export default Card
