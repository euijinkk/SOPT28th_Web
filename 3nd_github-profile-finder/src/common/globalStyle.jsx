import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *{
    box-sizing: border-box;
  }
  body{
      margin:0px;
      height:100%;
  }
  p {
      margin:0px;
  }

  button {
    outline: 0;
    border:0;
  }

  a{
    text-decoration: none;
    outline:0;
    color: white;
  }
`;

export default GlobalStyle;
