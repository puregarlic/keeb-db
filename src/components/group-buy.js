import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Link } from 'react-feather'
import { Textfit } from 'react-textfit'
import { string, arrayOf, shape } from 'prop-types'
import Carousel, { Modal, ModalGateway } from 'react-images'

const Card = styled.div`
  width: 300px;
  height: 320px;
  border: 3px solid #333;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 180px 1fr;
  transition: 0.1s ease-in-out;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
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

  &:hover {
    color: #fff;
    background: #333;
  }

  &:active {
    background: pink;
    color: #333;
  }
`

const GroupBuy = props => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Card onClick={() => setShowModal(true)}>
        <img src={props.images[0].url} />
        <Info>
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
            <LinkButton>
              <Link size={24} />
            </LinkButton>
          </div>
        </Info>
      </Card>
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
