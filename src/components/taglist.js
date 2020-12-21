import React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const Tag = styled.li`
  margin: 0.25em;
  border: solid 1.5px #373f49;
  border-radius: 0.5em;
  & > a {
    text-decoration: none;
    display: inline-block;
    padding: 0.25em 0.5em;
  }
  &:hover {
    background-color: #ccc;
  }
`;

export default ({ tags }) => (
  <TagList>
    {tags &&
      tags.map((tag) => (
        <Tag>
          <Link to={`/tags/${tag.slug}`}>{tag.title}</Link>
        </Tag>
      ))}
  </TagList>
)
