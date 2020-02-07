import { merge, clone } from 'lodash-es'

const buttonBase = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  px: 4,
  py: 3,
  fontSize: 1,
  borderRadius: 0,
  fontFamily: 'body',
  border: 0,
  bg: 'background',
  color: 'text',
  fontWeight: 'bold',
  transition: '0.1s ease-in-out',
  '&:focus': {
    outline: 'none',
    boxShadow: 'accent.default'
  }
}

const hoveredBase = {
  transform: 'translate(2px, 2px)'
}

const activeBase = {
  transform: 'translate(8px, 8px)'
}

export default {
  primary: {
    ...buttonBase,
    boxShadow: 'brand.default',
    '&:hover': {
      ...hoveredBase,
      boxShadow: 'brand.hovered'
    },
    '&:active': {
      ...activeBase,
      boxShadow: 'brand.pressed'
    }
  },
  confirm: {
    ...buttonBase,
    boxShadow: 'intent.confirm.default',
    '&:hover': {
      ...hoveredBase,
      boxShadow: 'intent.confirm.hovered'
    },
    '&:active': {
      ...activeBase,
      boxShadow: 'intent.confirm.pressed'
    }
  },
  danger: {
    ...buttonBase,
    boxShadow: 'intent.danger.default',
    '&:hover': {
      ...hoveredBase,
      boxShadow: 'intent.danger.hovered'
    },
    '&:active': {
      ...activeBase,
      boxShadow: 'intent.danger.pressed'
    }
  },
  disabled: {
    ...buttonBase,
    color: 'grey',
    boxShadow: '8px 8px 0 gainsboro',
    cursor: 'not-allowed'
  }
}
