import {Link } from 'react-router-dom';
import styled from "styled-components"
import Contents from "../components/Contents";

const MainContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display:flex;
    
    aside{
        width: 20%;
        background-color: gray; 
    }
    section{
        width: 80%;
    }

    


`;
 
const Main =()=>{
    return(
        <MainContainer>
            <aside>
                <p>사이드바</p>
                <ul>
                    <li><Link to="/main/dashboard">ITOMS 운영현황</Link></li>
                    <li><Link to="/main/corpmanager">기업관리자 계정관리</Link></li>
                    <li><Link to="/main/usermanager">사용자 계정관리</Link></li>
                    <li><Link to="/main/devicemanager">장비현황</Link></li>
                </ul>
            </aside>
            <Contents/>
        </MainContainer>
    )
}
export default Main;