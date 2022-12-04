import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root{
        --gray:#E0E0E0;
    }
    
    html, body, #root {
        height: 100%
    }

    html { 
        font-family: ‘SUIT’, sans-serif;
    };
    body{

    }
    a{
        color:black;  
        text-decoration: none;
    }
    button{
        border-radius: 2px;
    }
`;
export default GlobalStyles;
