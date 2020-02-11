const headingBase = {
  fontFamily: 'heading',
  fontWeight: 'bold',
  lineHeight: 'heading',
  color: 'text'
}

export default {
  h1: {
    ...headingBase,
    mt: 0,
    fontSize: 7,
    mb: 4
  },
  h2: {
    ...headingBase,
    fontSize: 6,
    mb: 4,
    mt: 5
  },
  h3: {
    ...headingBase,
    fontSize: 5,
    mb: 3,
    mt: 5
  },
  h4: {
    ...headingBase,
    fontSize: 4,
    mb: 3
  },
  h5: {
    ...headingBase,
    fontSize: 3,
    mb: 2
  },
  h6: {
    ...headingBase,
    fontSize: 2,
    mb: 2
  }
}
