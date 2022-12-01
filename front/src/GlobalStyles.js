import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root{
        --gray:#E0E0E0;
    }

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
