import React from 'react'
import { Link } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'

const Submit = () => (
  <Layout>
    <SEO title="Submit" />
    <h1>So you wanna submit a group buy, huh?</h1>
    <p>Stay tuned. You'll be able to do that shortly.</p>
    <p>
      Until then, check out the <Link to="/">group buys</Link> that I've
      painstakingly imported by hand.
    </p>
  </Layout>
)

export default Submit
