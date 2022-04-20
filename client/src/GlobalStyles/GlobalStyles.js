import { createGlobalStyle } from "styled-components";


export default createGlobalStyle`
  :root {
    --color-black: #0B0C10;
    --color-darkgray: #1F2833;
    --color-lightgray:#C5C6C7;
    --color-aquamarine: #66FCF1;
    --color-cadetblue: #45A29E;
  }

  html,body {

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
      }
  }
`;
