import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  :root {
    --color-black: #202427;
    --color-mediumgray: #a4a4a4;
    --color-whitesmoke: #f1f1f1;
    --color-orange: #f36e17;
  }

  html,body {

      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        font-family: 'Open Sans', sans-serif;
      }

      a{
        color: orange;
        text-decoration: none;
      }

  }
`;
