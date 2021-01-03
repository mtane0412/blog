import React from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const Wrapper = styled.div`
    margin: 2em 0 0 0;
    padding: 0 1.5em 2em;
`

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  a {
    padding: 1em;
    border-radius: 2px;
    text-decoration: none;
    transition: 0.2s;
    &:hover {
        color: #fff;
        background: #333;
      }
  }
`

const PrevNext = ({ prev, next }) => {
  return (
    <Wrapper>
        <Box>
            {next && (
                <Link to={`/${next.slug}/`} style={{marginRight: 'auto', order: 1}}>&#8592; {next.title}</Link>
            )}
            {prev && (
                <Link to={`/${prev.slug}/`} style={{marginLeft: 'auto', order: 2}}>{prev.title} &#8594;</Link>
            )}
        </Box>
    </Wrapper>
  )
}

export default PrevNext
