import React from 'react'

import ErrorBoundary from './src/components/error-boundary'

export function wrapPageElement({ element }) {
  return <ErrorBoundary>{element}</ErrorBoundary>
}
