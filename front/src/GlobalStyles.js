import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    html { 
        height: 100vh;
        font-family: ‘SUIT’, sans-serif;
        body{
            min-height: 100vh;
            a{
                color:black;  
                text-decoration: none;
            }
        }
    };
    
`;
export default GlobalStyles;
