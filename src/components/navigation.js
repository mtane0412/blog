import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const Navigation = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  height: 20vh;
  max-height: 100px;
  font-size: 1.25em;
`

const NavigationItem = styled.li`
  display: inline-flex;
  align-items: center;
  margin: 0 1em;
  a {
    color: currentColor;
  }
`

export default () => (
  <nav role="navigation">
    <Navigation>
      <NavigationItem>
        <Link to="/">Home</Link>
      </NavigationItem>
      <NavigationItem>
        <Link to="/blog/">Blog</Link>
      </NavigationItem>
      <NavigationItem>
        <Link to="/tags/">Tags</Link>
      </NavigationItem>
    </Navigation>
  </nav>
)
