import React from 'react'

import Narrow from '../layouts/narrow'
import SEO from '../components/seo'

const Disclaimers = () => (
  <Narow>
    <SEO title="Disclaimers" />
    <h1 style={{ marginTop: 0 }}>Disclaimers</h1>
    <h2>Ownership</h2>
    <h3>Content</h3>
    <p style={{ lineHeight: 1.7 }}>
      First and foremost, I don't own any of the content on this website. All of
      the information used to detail a group buy has been collected from
      elsewhere, and likely belongs to either the organizer of the group buy or
      the vendors who are fulfilling orders. I've just converted it into a
      usable format for this website.
    </p>
    <h3>Website</h3>
    <p style={{ lineHeight: 1.7 }}>
      I do own most of the code used for this website, however. The code is{' '}
      <a href="https://github.com/puregarlic/keeb-db">
        open-source and available on GitHub.
      </a>{' '}
      This project is specifically licensed under an MIT license, so feel free
      to fork it and make your own adjustments.
    </p>
  </Narow>
)

export default Disclaimers
