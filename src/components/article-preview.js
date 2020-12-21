import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import TagList from '../components/taglist'

const PreviewTitle = styled.h3`
  font-size: 1.5em;
`

export default ({ article }) => (
  <div>
    <Img alt="" fluid={article.heroImage.fluid} />
    <PreviewTitle>
      <Link to={`/${article.slug}`}>{article.title}</Link>
    </PreviewTitle>
    <time datetime={article.datetime}>{article.publishDate}</time>
    <p>{article.description.childMarkdownRemark.excerpt}</p>
    <TagList tags={article.tags} />
  </div>
)