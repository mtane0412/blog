import React from 'react'
import Container from './container'
import Navigation from './navigation'
import { Global } from "@emotion/react"
import { globalStyles } from './global-styles'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Container>
        <Global styles={globalStyles} />
        <Navigation />
        {children}
      </Container>
    )
  }
}

export default Template
