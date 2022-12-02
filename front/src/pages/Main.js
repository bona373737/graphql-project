import {Link } from 'react-router-dom';
import styled from "styled-components"
import { nowMemberInVar } from '../makeVar';
import Contents from "../components/Contents";
import { useQuery, useReactiveVar } from '@apollo/client';
import {GET_NOWMEMBER } from "../graphql/query";

const MainContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
    display:flex;
    
    aside{
        min-width: 20%;
        background-color: var(--gray); 
        .menu_list{
            
        }
    }
    main{
        width: 80%;
    }
`;
 
const Main =()=>{
    // const nowMember = nowMemberInVar();
    const nowMember = useReactiveVar(nowMemberInVar);
    console.log(nowMember);

    const {data} = useQuery(GET_NOWMEMBER);
    console.log(data);


    return(
            <MainContainer>
                <aside>
                    <p>사이드바</p>
                    <ul className='menu_list'>
                    <li><Link to="/main/dashboard">ITOMS 운영현황 (사이트관리자)</Link></li>
                    <li><Link to="/main/corpmanager">기업관리자 계정관리 (사이트관리자)</Link></li>
                    <li><Link to="/main/usermanager">사용자 계정관리 (기업) </Link></li>
                    <li><Link to="/main/devicemanager">장비현황  (기업,사용자)</Link></li>


                        {/* { role_no &&
                            role_no === 1? (
                                <>
                                <li><Link to={{pathname:"/main/corpmanager"}}>기업관리자 계정관리 (사이트관리자)</Link></li>
                                </>
                            ): role_no ===2? (
                                <>
                                <li><Link to={{pathname:"/main/usermanager"}}>사용자 계정관리 (기업) </Link></li>
                                <li><Link to={{pathname:"/main/devicemanager"}}>장비현황  (기업,사용자)</Link></li>
                                </>
                                ) : (
                                    <>
                                    <li><Link to={{pathname:"/main/devicemanager"}}>장비현황  (기업,사용자)</Link></li>
                                    </>
                                    )
                                } */}
                            
                            
                    
                            
                            {   
                                //react-router-dom V5
                                // location.state.loginMember && <li><Link to={{pathname:"/main/dashboard"}} >ITOMS 운영현황 (사이트관리자) </Link></li>
                                //react-router-dom V6
                                // location.state.loginMember && <li><Link to="dashboard" state={location.state}>ITOMS 운영현황 (사이트관리자) </Link></li>
                            }                            
                    </ul>
                </aside>
                <main>
                    {
                        nowMember[0] &&
                        <>
                        <div>접속자 : {nowMember[0].name}</div>
                        <div>아이디 : {nowMember[0].id}</div>
                        </>
                    }
                    <hr/>
                    <Contents/>
                </main>

            </MainContainer>
    )
}
export default Main;