import React, { useState, useLayoutEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/core'
import { Link as LinkIcon, X as XIcon, List as ListIcon } from 'react-feather'
import { Textfit } from 'react-textfit'
import { useHoverDirty } from 'react-use'
import { string, arrayOf, shape, number } from 'prop-types'
import Carousel, { Modal, ModalGateway } from 'react-images'

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

const Card = styled.div`
  width: 300px;
  height: 320px;
  border: 3px solid #333;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 180px 1fr;
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
    animation-timing-function: ease-in-out;

    &:hover {
      animation: ${wiggle} 0.3s;
      animation-direction: normal;
      animation-fill-mode: forwards;
    }
  }

  &:hover {
    box-shadow: 8px 8px 0 pink;
    transform: translate(-8px, -8px);
  }

  &.active {
    box-shadow: 8px 8px 0 pink;
    transform: translate(-8px, -8px);
  }
`

const Info = styled.div`
  display: grid;
  grid-template-areas: 'name name' 'date links';
  grid-template-rows: 1fr max-content;
  grid-template-columns: 1fr max-content;
  padding: 24px;
`

const LinkButton = styled.div`
  display: flex;
  width: 48px;
  height: 48px;
  border-radius: 100%;
  align-items: center;
  justify-content: center;
  transition: 0.1s ease-in-out;

  &.active {
    color: #fff;
    background: #333;
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

const Links = ({ placement, width, links }) => {
  return (
    <LinkContainer placement={placement} width={width}>
      <div style={{ position: 'absolute', width: '100%' }}>
        {links.map(link => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            style={{ textDecorationColor: 'black' }}
            onClick={e => e.stopPropagation()}>
            <Link>
              {link.region ? <b>{link.region}: </b> : ''}
              {link.label}
            </Link>
          </a>
        ))}
      </div>
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

const GroupBuy = props => {
  const infoRef = useRef(null)
  const isHovered = useHoverDirty(infoRef)
  const [showLinks, setShowLinks] = useState(false)
  const [linksPosition, setLinksPosition] = useState({ x: 0, y: 0 })
  const [showModal, setShowModal] = useState(false)
  const [cardRef, calculateArea, dimensions] = useSafeArea()

  return (
    <>
      <Card
        ref={cardRef}
        className={showLinks ? 'active' : ''}
        style={{ zIndex: showLinks ? 2 : undefined }}>
        <div className="img">
          <img
            src={props.images[0].url}
            onClick={() => setShowModal(true)}
            style={{ userSelect: 'none' }}
          />
        </div>
        <Info
          ref={infoRef}
          onClick={() => {
            setShowLinks(!showLinks)
          }}>
          <div style={{ gridArea: 'name' }}>
            <Textfit
              mode="single"
              forceSingleModeWidth={true}
              max={24}
              min={14}>
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
            <LinkButton className={isHovered ? 'active' : ''}>
              {isHovered ? (
                <ListIcon size={24} />
              ) : showLinks ? (
                <XIcon size={24} />
              ) : (
                <LinkIcon size={24} />
              )}
            </LinkButton>
          </div>
        </Info>
        {showLinks && (
          <Links
            links={props.links}
            width={linksWidth}
            placement={calculateArea()}
          />
        )}
      </Card>
      {showLinks && <Shade onClick={() => setShowLinks(false)} />}
      <ModalGateway>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <Carousel
              views={props.images.map(image => {
                return { source: image.url }
              })}
            />
          </Modal>
        )}
      </ModalGateway>
    </>
  )
}

GroupBuy.propTypes = {
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
