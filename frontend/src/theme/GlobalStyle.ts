import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    font-size: 1rem;
    border: 0;
    outline: none;
    background: none;
  }

  body, html {
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
  }

  button {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
