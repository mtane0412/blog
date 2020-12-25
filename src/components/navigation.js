import React from 'react'
import { StaticQuery, graphql, Link } from "gatsby"
import logo from '../../static/assets/logo.png'
import Img from 'gatsby-image'
import styled from '@emotion/styled'


const SiteHeader = styled.header`
  margin: 1.5em;
  text-align: center;
  img {
    max-height: 50px;
  }
`

const Navigation = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 1.25em;
`

const NavigationItem = styled.li`
  display: inline-flex;
  align-items: center;
  padding: 0 1em;
  a {
    color: currentColor;
  }
`

export default () => (
  <StaticQuery
    query={graphql`
      query HeadingQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <SiteHeader>
        <img
          src={logo}
          alt={data.site.siteMetadata.title}
          title={data.site.siteMetadata.title}
        />
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
      </SiteHeader>
    )}
  />
)

