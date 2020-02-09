import React from 'react'
import { Provider, createClient } from 'urql'

function withURQL(Element) {
  const client = createClient({
    url: 'https://graphql.fauna.com/graphql',
    fetchOptions: {
      headers: {
        Authorization: `Bearer ${process.env.GATSBY_FAUNA_TOKEN}`
      }
    }
  })

  return (props = {}) => (
    <Provider value={client}>
      <Element {...props} />
    </Provider>
  )
}

export default withURQL
