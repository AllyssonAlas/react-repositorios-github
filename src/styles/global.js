import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background-color: rgba(113, 89, 193, 1);
    -webkit-font-smoothing: antialiased !important;
  }

  body, input, button {
    color: rgba(34, 34, 34, 1);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  button {
    cursor: pointer;
  }
`
