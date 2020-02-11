import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { GitHub, Heart } from 'react-feather'
import { Flex, Box, Text, Heading } from 'rebass'

const FooterBase = styled.div`
  width: 100%;
  padding: 48px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #333;
  color: white;

  @media screen and (max-width: 956px) {
    flex-direction: column;
    flex-flow: column-reverse;
  }
`

const Footer = () => (
  <FooterBase>
    <Box sx={{ maxWidth: '45ch' }}>
      <Text lineHeight="body" fontSize={1}>
        Keeb DB is an archiving effort designed to help preserve the history of
        the mechanical keyboards community and make the mechanical keyboards
        community more accessible to prospective enthusiasts.
      </Text>
      <Text fontWeight={700} mt={3}>
        Thanks for stopping by!
      </Text>
    </Box>
    <Box mb={[5, null, 0]}>
      <Flex alignItems="center" width={1} justifyContent="space-evenly" mb={4}>
        <a
          href="https://github.com/puregarlic/keeb-db"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}>
          <GitHub />
        </a>
        <a
          href="https://ko-fi.com/puregarlic"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white', textDecoration: 'none' }}>
          <Heart />
        </a>
      </Flex>
      <Text fontSize={0}>
        Built by{' '}
        <a
          href="https://graham.now.sh"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'white' }}>
          PureGarlic#7300
        </a>
      </Text>
    </Box>
    <Box width={[1, '20ch']} mb={[5, null, 0]}>
      <Heading mb={2}>Links</Heading>
      <Link
        to="/"
        style={{ color: 'white', display: 'block', marginBottom: '12px' }}>
        Group Buys
      </Link>
      <Link
        to="/submit"
        style={{ color: 'white', display: 'block', marginBottom: '12px' }}>
        Submit
      </Link>
      <Link to="/disclaimers" style={{ color: 'white', display: 'block' }}>
        Disclaimers
      </Link>
    </Box>
  </FooterBase>
)

export default Footer
