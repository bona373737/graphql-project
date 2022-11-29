import { Routes, Route, Link } from 'react-router-dom';
import styled from "@emotion/styled.macro";
import DashBoard from "../components/DashBoard";

const MainContainer = styled.div`

`;

const Main =()=>{
    return(
        <>
            <aside>
                <p>사이드바</p>
                <ul>
                    <li><Link to="/dashboard">ITOMS 운영현황</Link></li>
                    <li><Link>기업관리자 계정관리</Link></li>
                    <li><Link>사용자 계정관리</Link></li>
                    <li><Link>장비현황</Link></li>
                    
                </ul>
            </aside>
            <main>
                <p>content위치</p>
                <Routes>
                    <Route path='/dashboard' exact element={<DashBoard/>}/>
                    <Route path='/' element=""/>
                    <Route path='' element=""/>
                    <Route path='' element=""/>
                </Routes>
            </main>
        </>
    )
}
export default Main;