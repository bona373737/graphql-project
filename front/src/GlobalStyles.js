import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root{
        --black:#0C0B10;
        --gray:#E0E0E0;
        --darkGray: #2D3038;
    }
    
    html, body, #root {
        height: 100%;
        background-color: var(--darkGray);
    }

    html { 
        font-family: ‘SUIT’, sans-serif;
    };
    body{
        border-radius: 5px;

    }
    a{
        color:black;  
        text-decoration: none;
    }
    button{
        border-radius: 2px;
        border: none;
        cursor: pointer;
    }
`;
export default GlobalStyles;
