import React from 'react'
import { Link } from 'gatsby'

import Narrow from '../layouts/narrow'
import SEO from '../components/seo'

const Submit = () => (
  <Narrow>
    <SEO title="Submit" />
    <h1>So you wanna submit a group buy, huh?</h1>
    <p style={{ lineHeight: 1.7 }}>
      Stay tuned. I'm working on a submission process that I'm looking to roll
      out in the coming weeks.
    </p>
    <p style={{ lineHeight: 1.7 }}>
      Until then, you have two options: Either check out the{' '}
      <Link to="/">group buys</Link> that I've painstakingly imported by hand so
      far, or{' '}
      <a href="https://discord.gg/GjhW22p">send me a message on Discord.</a>
    </p>
  </Narrow>
)

export default Submit
