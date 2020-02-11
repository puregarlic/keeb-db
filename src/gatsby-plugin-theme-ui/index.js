import forms from './rebass/forms'
import buttons from './rebass/buttons'

import text from './mdx/text'
import headings from './mdx/headings'

export default {
  colors: {
    text: '#333',
    background: '#FFF',
    primary: 'aquamarine',
    secondary: 'pink',
    grey: 'gainsboro',
    intent: {
      danger: 'crimson',
      confirm: 'greenyellow',
      warning: 'yellow'
    }
  },
  fonts: {
    body: 'Roboto Mono, monospace',
    heading: 'Roboto Mono, monospace'
  },
  fontWeights: {
    body: 400,
    bold: 700
  },
  lineHeights: {
    body: 1.9,
    heading: 1.5
  },
  fontSizes: [12, 14, 16, 18, 20, 24, 32, 48, 64],
  space: [0, 3, 6, 12, 24, 48, 96],
  breakpoints: ['40em', '52em', '64em'],
  borders: ['3px solid #333'],
  shadows: {
    brand: {
      default: '8px 8px 0 aquamarine',
      hovered: '6px 6px 0 aquamarine',
      pressed: '0 0 0 aquamarine'
    },
    accent: {
      default: '8px 8px 0 pink',
      hovered: '6px 6px 0 pink',
      pressed: '0 0 0 pink'
    },
    intent: {
      danger: {
        default: '8px 8px 0 crimson',
        hovered: '6px 6px 0 crimson',
        pressed: '0 0 0 crimson'
      },
      confirm: {
        default: '8px 8px 0 greenyellow',
        hovered: '6px 6px 0 greenyellow',
        pressed: '0 0 0 greenyellow'
      },
      warning: {
        default: '8px 8px 0 yellow',
        hovered: '6px 6px 0 yellow',
        pressed: '0 0 0 yellow'
      }
    }
  },
  styles: {
    ...headings,
    ...text
  },
  forms,
  buttons
}
