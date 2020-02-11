import { OutboundLink } from 'gatsby-plugin-google-analytics'

export default {
  a: props => (
    <OutboundLink {...props} target="_blank" rel="noopener noreferrer">
      {props.children}
    </OutboundLink>
  )
}
