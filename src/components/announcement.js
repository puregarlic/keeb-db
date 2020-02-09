import React from 'react'
import { Box, Text } from 'rebass'
import { node, bool } from 'prop-types'
import { createPortal } from 'react-dom'

import usePortal from '../hooks/use-portal'

const Announcement = ({ children, marquee }) => {
  const target = usePortal('announcement-root')

  return createPortal(
    <Box
      width={1}
      bg="secondary"
      p={4}
      as={marquee ? 'marquee' : undefined}
      fontSize={1}
      behavior={marquee ? 'slide' : undefined}>
      {children}
    </Box>,
    target
  )
}

Announcement.propTypes = {
  children: node.isRequired,
  marquee: bool
}

export default Announcement
