const headingBase = {
  mt: 5,
  mb: 4,
  fontFamily: 'heading',
  fontWeight: 'bold',
  lineHeight: 'heading',
  color: 'text'
}

export default {
  h1: {
    ...headingBase,
    mt: 0,
    fontSize: 7
  },
  h2: {
    ...headingBase,
    fontSize: 6
  },
  h3: {
    ...headingBase,
    fontSize: 5
  },
  h4: {
    ...headingBase,
    fontSize: 4
  },
  h5: {
    ...headingBase,
    fontSize: 3
  },
  h6: {
    ...headingBase,
    fontSize: 2
  }
}
