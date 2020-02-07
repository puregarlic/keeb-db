export default {
  input: {
    border: 0,
    bg: 'background',
    boxShadow: 'brand.default',
    p: 3,
    fontFamily: 'body',
    transition: '0.1s ease-in-out',
    '&:focus': {
      outline: 'none',
      boxShadow: 'accent.default'
    }
  },
  select: {
    border: 0,
    bg: 'background',
    borderRadius: 0,
    width: '100%',
    boxShadow: 'brand.default',
    p: 3,
    transition: '0.1s ease-in-out',
    fontFamily: 'body',
    '&:focus': {
      outline: 'none',
      boxShadow: 'accent.default'
    }
  },
  label: {
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 1,
    '& > *:last-child': {
      mt: 2
    }
  }
}
