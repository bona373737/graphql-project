import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
    ${reset}

    :root{
        --mainColor:#17203F;
        --subColor:#EFF3FF;
        /* --gray:#F5F5F5; */
        --darkGray: #2D3038;
        
        --skyblue:#FAFBFF;
        --pointColor:#0F3D81;
        --gray:#E0E0E0;
        --fontBlack:#212629; 

        --fontMainColor: white;
        --fontSubColor:#17203F;
    }
    
    html, body, #root {
    }
    
    html { 
        height: 100vh;
        font-family: 'Nanum Gothic Coding', monospace;
    }
    body{
        font-size: 14px;
        height: 100%;

    }
    a{
        text-decoration: none;
        color: var(--fontBlack);
    }
    li{
        list-style: none;
    }
`;
export default GlobalStyles;
