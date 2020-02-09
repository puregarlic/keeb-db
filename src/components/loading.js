import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const rightSquare = keyframes`
  25% {
    transform: translate(-12px, 12px);
  }
  50% {
    transform: translate(-12px, -12px);
  }
  75% {
    transform: translate(12px, -12px);
  }
`

const leftSquare = keyframes`
  25% {
    transform: translate(12px, -12px);
  }
  50% {
    transform: translate(12px, 12px);
  }
  75% {
    transform: translate(-12px, 12px);
  }
`

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;

  &::before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: aquamarine;
    transform-origin: center;
    transform: translate(12px, 12px);
    animation: 1s ${rightSquare} ease-in-out infinite;
  }

  &::after {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    background: #333;
    transform-origin: center;
    transform: translate(-12px, -12px);
    animation: 1s ${leftSquare} ease-in-out infinite;
  }
`

export default Loading
