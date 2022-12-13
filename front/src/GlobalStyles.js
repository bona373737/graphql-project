import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root{
        --mainColor:#17203F;
        --subColor:#EFF3FF;
        --pointColor:#5473FF;

        --gray:#E0E0E0;
        --darkGray: #2D3038;

        --fontMainColor: white;
        --fontSubColor:#17203F;
    }
    
    html, body, #root {
        height: 100vh;
        background-color: var(--background);
    }

    html { 
        font-family: ‘SUIT’, sans-serif;
    }
    body{
        font-size: 14px;

    }
    a{
        text-decoration: none;
    }
    button{
        background-color: var(--pointColor);
        border-radius: 2px;
        border: none;
        cursor: pointer;
        color: white;
        :hover{
            color: var(--pointColor);
            background-color: white;
        }
    }
`;
export default GlobalStyles;
