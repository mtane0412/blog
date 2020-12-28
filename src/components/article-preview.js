import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import TagList from '../components/taglist'

const Preview = styled.div`
  text-align: center;
`
const PreviewTitle = styled.h3`
  font-size: 1.5em;
  font-weight: normal;
`

export default ({ article }) => (
  <Preview>
    <Img alt="" fluid={article.heroImage.fluid} loading={"eager"} fadeIn={false} />
    <PreviewTitle>
      <Link to={`/${article.slug}`}>{article.title}</Link>
    </PreviewTitle>
    <time dateTime={article.datetime}>{article.publishDate}</time>
    <p>{article.description.childMarkdownRemark.excerpt}</p>
    <TagList tags={article.tags} />
  </Preview>
)