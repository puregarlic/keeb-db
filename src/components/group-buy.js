import React, { useState, useLayoutEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styled from '@emotion/styled'
import { useHover } from 'react-use'
import { Textfit } from 'react-textfit'
import { css, keyframes } from '@emotion/core'
import { string, arrayOf, shape, number } from 'prop-types'
import Carousel, { Modal, ModalGateway } from 'react-images'
import { Link as LinkIcon, X as XIcon, List as ListIcon } from 'react-feather'

import Shade from './shade'
import useSafeArea from '../hooks/use-safe-area'

const wiggle = keyframes`
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.1) rotate(2deg);
  }
  75% {
    transform: scale(1.1) rotate(-2deg);
  }
  100% {
    transform: scale(1.1) rotate(0);
  }
`

const zoom = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
`

const Card = styled(motion.div)`
  width: 300px;
  height: 320px;
  border: 3px solid #333;
  display: grid;
  background: #fff;
  grid-template-columns: 1fr;
  grid-template-rows: 180px 140px;
  transition: 0.1s ease-in-out;

  & > .img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  & > .img > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    animation: ${zoom} ease-in-out 0.2s reverse backwards;

    &:hover {
      animation: ${wiggle} 0.3s;
      animation-direction: normal;
      animation-fill-mode: forwards;
    }
  }

  &:hover {
    box-shadow: 8px 8px 0 pink;
    transform: translate(-8px, -8px);
    z-index: 2;
  }

  &.active {
    box-shadow: 8px 8px 0 pink;
    transform: translate(-8px, -8px);
    z-index: 2;
  }
`

const Info = styled.div`
  display: grid;
  grid-template-areas: 'name name' 'date links';
  grid-template-rows: 1fr max-content;
  grid-template-columns: 1fr max-content;
  padding: 24px;
`

const shake = keyframes`
  from, to {
    transform: rotate(180deg);
  }
  33% {
    transform: rotate(190deg);
  }
  66% {
    transform: rotate(170deg);
  }
`

const LinkButton = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease-in-out;
  transform: rotate(0deg);

  &.active {
    transform: rotate(180deg);

    &:hover {
      background: gainsboro;
      animation: ${shake} 0.4s ease-in-out infinite alternate;
    }
  }

  &.active:active {
    background: pink;
    color: #333;
  }
`

const LinkContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${props => props.width}px;
  top: -317px;
  ${props => {
    switch (props.placement) {
      case 'left':
        return `left: -${props.width + 24}px;`
      default:
        return 'left: calc(100% + 24px);'
    }
  }}
`

const Link = styled.div`
  padding: 12px;
  color: #333;
  width: 100%;
  border: 3px solid #333;
  background: #fff;
  margin-bottom: 16px;
  box-shadow: 8px 8px 0 deepskyblue;
  transition: 0.1s ease-in-out;

  &:hover {
    box-shadow: 6px 6px 0 deepskyblue;
    transform: translate(2px, 2px);
  }

  &:active {
    box-shadow: none;
    transform: translate(8px, 8px);
  }
`

const NewLink = styled(motion.a)`
  display: block;
  padding: 12px;
  color: #333;
  width: 100%;
  border: 3px solid #333;
  background: #fff;
  margin-bottom: 16px;
  text-decoration: none;
`

const linkListVariants = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  },
  hidden: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

const Links = ({ placement, width, links }) => {
  const linkVariants = useMemo(
    () => ({
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        boxShadow: '8px 8px 0 deepskyblue'
      },
      hidden: {
        opacity: 0,
        x: placement === 'left' ? 4 : -4,
        y: 0
      },
      hover: {
        x: 2,
        y: 2,
        boxShadow: '6px 6px 0 deepskyblue'
      },
      tap: {
        x: 8,
        y: 8,
        boxShadow: 'none'
      }
    }),
    []
  )

  return (
    <LinkContainer placement={placement} width={width}>
      <motion.div
        variants={linkListVariants}
        initial="hidden"
        animate="visible"
        exit="hidden">
        {links.map(link => (
          <NewLink
            variants={linkVariants}
            exit="hidden"
            transition={{ ease: 'easeInOut', duration: 0.1 }}
            whileHover="hover"
            whileTap="tap"
            key={link.label}
            href={link.url}
            target="_blank"
            style={{ textDecorationColor: 'black' }}
            onClick={e => e.stopPropagation()}>
            {link.region ? <b>{link.region}: </b> : ''}
            {link.label}
          </NewLink>
        ))}
      </motion.div>
    </LinkContainer>
  )
}

Links.propTypes = {
  width: number,
  placement: string,
  links: arrayOf(
    shape({
      label: string,
      url: string,
      region: string
    })
  )
}

const linksWidth = 256

const animVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

const GroupBuy = props => {
  const [showLinks, setShowLinks] = useState(false)
  const [linksPosition, setLinksPosition] = useState({ x: 0, y: 0 })
  const [showModal, setShowModal] = useState(false)
  const [cardRef, calculateArea, dimensions] = useSafeArea()

  const [info] = useHover(isHovering => (
    <Info
      onClick={() => {
        setShowLinks(!showLinks)
      }}>
      <div style={{ gridArea: 'name' }}>
        <Textfit mode="single" forceSingleModeWidth={true} max={24} min={14}>
          <span style={{ fontWeight: 700 }}>{props.name}</span>
        </Textfit>
      </div>
      <div style={{ gridArea: 'date', alignSelf: 'end' }}>
        <h5
          style={{
            margin: 0,
            fontVariant: 'small-caps',
            color: '#AAA'
          }}>
          ends
        </h5>
        <b>{props.date}</b>
      </div>
      <div style={{ gridArea: 'links' }}>
        <LinkButton className={isHovering ? 'active' : undefined}>
          <AnimatePresence exitBeforeEnter>
            {showLinks ? (
              <motion.div
                key="clear"
                style={{ height: 24, width: 24 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                exit={{ opacity: 0 }}>
                <XIcon size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="links"
                style={{ height: 24, width: 24 }}
                initial={{ opacity: 0 }}
                transition={{ ease: 'easeInOut', duration: 0.1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}>
                <LinkIcon size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </LinkButton>
      </div>
    </Info>
  ))

  return (
    <>
      <Card
        positionTransition
        variants={animVariants}
        transition={{ ease: 'easeInOut', duration: 0.1 }}
        ref={cardRef}
        className={showLinks ? 'active' : ''}
        style={{ zIndex: showLinks ? 2 : undefined }}>
        <div className="img">
          <img
            src={props.coverImage.url}
            onClick={() => setShowModal(true)}
            style={{ userSelect: 'none' }}
          />
        </div>
        {info}
        <AnimatePresence>
          {showLinks && (
            <Links
              links={props.links}
              width={linksWidth}
              placement={calculateArea()}
            />
          )}
        </AnimatePresence>
      </Card>
      <AnimatePresence>
        {showLinks && <Shade onClick={() => setShowLinks(false)} />}
      </AnimatePresence>
      <ModalGateway>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Carousel
              views={[
                props.coverImage,
                ...props.images.map(image => {
                  return { source: image.url }
                })
              ]}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}

GroupBuy.propTypes = {
  coverImage: shape({
    caption: string,
    url: string
  }),
  images: arrayOf(
    shape({
      caption: string,
      url: string
    })
  ),
  name: string,
  date: string,
  links: arrayOf(
    shape({
      label: string,
      region: string,
      url: string
    })
  )
}

export default GroupBuy
