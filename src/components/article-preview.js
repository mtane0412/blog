import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from '@emotion/styled'

const PreviewTitle = styled.h3`
  font-size: 1.5em;
`

export default ({ article }) => (
  <div>
    <Img alt="" fluid={article.heroImage.fluid} />
    <PreviewTitle>
      <Link to={`/${article.slug}`}>{article.title}</Link>
    </PreviewTitle>
    <small>{article.publishDate}</small>
    <p>{article.description.childMarkdownRemark.excerpt}</p>
  </div>
);
