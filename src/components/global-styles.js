import { css } from '@emotion/react'

export const globalStyles = css`
  @font-face {
    font-family: "Avenir";
    font-weight: 400;
    font-style: normal;
    src: url("/avenir-400.woff2") format("woff2");
    font-display: swap;
  }

  body {
    font-family: "Helvetica Neue", Arial, "Hiragino Kaku Gothic ProN", "Hiragino Sans", Meiryo, sans-serif;
    font-size: 1em;
    line-height: 1.65;
    color: #373F49;
    background: #eee;
    margin: 0;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h3 {
    font-size: 1.25em;
  }

  a {
    color: currentColor;
  }

  .wrapper {
    width: calc(100% - 10vmin);
    margin: 0 auto;
    padding: 5vmin 0;
  }

  /**
   * article grid
   */
  .article-list {
    margin: 0;
    padding: 0;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 5vmin;
  }

  /**
   *
   */
  .section-headline {
    padding: 0 0 0.4em 0;
    margin: 0 0 5vmin 0;
    border-bottom: 1px solid #ddd;
  }

  /**
   *
   */
  .list-inline {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .list-inline li {
    display: inline-block;
  }

  p code {
    padding: .1em;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
    background-color: #eee;
    border: 1px solid #ccc;
  }
  
  .gatsby-code-title {
    margin-bottom: -0.6rem;
    padding: 0.5em 1em;
    font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
  
    background-color: #000;
    color: #ccc;
    z-index: 0;
  
    border-top-left-radius: 0.3em;
    border-top-right-radius: 0.3em;
  }
`