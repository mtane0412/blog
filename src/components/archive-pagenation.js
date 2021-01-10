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

const ArchivePagenation = ({ prevPage, nextPage, thisMonth, thisYear }) => {
  return (
    <Wrapper>
        <Box>
            {nextPage && (
                <Link to={`/archives/${nextPage}/`} style={{marginRight: 'auto', order: 1}}>&#8592; {nextPage}</Link>
            )}
            {thisMonth ?
              <Link to={`/archives/${thisYear}/`} style={{order: 2}}>{thisYear}年一覧へ</Link> :
              <Link to="/archives/" style={{order: 2}}>アーカイブ一覧へ</Link>}
            {prevPage && (
                <Link to={`/archives/${prevPage}/`} style={{marginLeft: 'auto', order: 3}}>{prevPage} &#8594;</Link>
            )}
        </Box>
    </Wrapper>
  )
}

export default ArchivePagenation