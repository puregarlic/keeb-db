import React, { Component } from 'react'
import { Flex, Box, Heading, Text } from 'rebass'

export default class ErrorBoundary extends Component {
  state = {
    error: undefined
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.configureScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
    })

    Sentry.captureException(error)
  }

  render() {
    if (this.state.error) {
      return (
        <Flex
          width={1}
          height="100vh"
          alignItems="center"
          justifyContent="center">
          <Box sx={{ maxWidth: '500px' }}>
            <Heading mb={4} fontSize={6}>
              Uh oh
            </Heading>
            <Text fontFamily="body" mb={4} lineHeight={1.7} textAlign="justify">
              Something broke when we tried to render Keeb DB. Most likely, this
              means that a redeploy failed to retrieve an image during a build.
            </Text>
            <Text fontFamily="body" lineHeight={1.7} textAlign="justify">
              Don't worry about it, though. The maintainers have been notified
              and things should be fixed shortly. Check back in again in an hour
              and we should be good to go.
            </Text>
          </Box>
        </Flex>
      )
    }

    return this.props.children
  }
}
