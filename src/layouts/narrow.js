import React from 'react'

const Narrow = ({ children }) => (
  <main
    style={{
      maxWidth: '57ch',
      margin: '0 auto',
      textAlign: 'justify',
      textJustify: 'inter-word'
    }}>
    {children}
  </main>
)

export default Narrow
