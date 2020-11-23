import React from 'react'
import './base.css'
import Container from './container'
import Navigation from './navigation'
import './prism-tomorrow.css'

class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <Container>
        <Navigation />
        {children}
      </Container>
    )
  }
}

export default Template
