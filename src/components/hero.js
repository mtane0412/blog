import React from 'react'
import Img from 'gatsby-image'
import styled from '@emotion/styled'

const Hero = styled.div`
  position: relative;
  background: #000;
  color: #fff;
  text-align: center;
`

const HeroImage = styled(Img)`
  /*
  Ensure golden ratio for the hero size while limiting it to some extend to
  the viewport width
  */
  height: 61.8vh;
  max-height: 400px;
`

const HeroDetails = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  left: 50%;
  bottom: 0;
  transform: translate(-50%, 0);
  font-size: 14px;
  padding: 0 0.5em;
  @media(min-width: 600px) {
    font-size: 16px;
  }
  @media(min-width: 1000px) {
    font-size: 20px;
  }
`

const HeroHeadline = styled.h3`
  margin: 0;
`

const HeroTitle = styled.p`
  margin: 0;
  font-size: 1.125em;
  font-weight: bold;
`

export default ({ data }) => (
  <Hero>
    <HeroImage
      alt={data.name}
      fluid={data.heroImage.fluid}
    />
    {data.name && data.title && data.shortBio.shortBio && 
    <HeroDetails>
      <HeroHeadline>{data.name}</HeroHeadline>
      <HeroTitle>{data.title}</HeroTitle>
      <p>{data.shortBio.shortBio}</p>
    </HeroDetails>
    }
  </Hero>
)
