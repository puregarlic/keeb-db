import React from 'react'

import Narrow from '../../layouts/narrow'

const Input = () => (
  <>
    <div
      style={{
        background: 'aquamarine',
        padding: '64px 0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <div style={{ maxWidth: '57ch' }}>
        <h2>WARNING:</h2>
        <p style={{ lineHeight: 1.7 }}>
          This page is intended for administration purposes only. It will not be
          published to the live site during build; you should <b>only</b> use it
          to input data more easily.
        </p>
      </div>
    </div>
    <Narrow>
      <h1>Enter Group Buys</h1>
    </Narrow>
  </>
)

export default Input
