import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    html { 
        font-family: ‘SUIT’, sans-serif;
    };

    body{
        a{
            /* color:white;   */
            text-decoration: none;
        }
    }
`;
export default GlobalStyles;
