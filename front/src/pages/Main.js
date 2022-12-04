import {Link, NavLink } from 'react-router-dom';
import styled from "styled-components"
import { nowMemberInVar } from '../makeVar';
import Contents from "../components/Contents";
import { useQuery, useReactiveVar } from '@apollo/client';
import {GET_NOWMEMBER } from "../graphql/query";

const MainContainer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display:flex;
    
    aside{
        min-width: 20%;
        background-color: var(--gray); 
        h1{
            margin: 30px 0;
            font-size: 20px;
            text-align: center;
        }
        .menu_list{
            text-align: center;
            li{
                margin: 20px 0;
                a{
                    display: block;
                    width: 100%;
                    line-height: 40px;
                    &:hover{
                        background-color: black;
                        color: white;
                    }
                }
                .active{
                    background-color: black;
                    color: white;
                }
            }
        }
    }
    main{
        width: 80%;
        
        .now_user_info{
            min-height: 60px;
        }
    }
`;
 
const Main =()=>{
    // const nowMember = nowMemberInVar();
    // const nowMember = useReactiveVar(nowMemberInVar);
    // console.log(nowMember);
    const {data:nowMember} = useQuery(GET_NOWMEMBER);
    console.log(nowMember);

    const {loading,error,data} = useQuery(GET_NOWMEMBER);


    return(
            <MainContainer>
                <aside>
                    <h1>OJT_ITOMS</h1>
                    <ul className='menu_list'>
                    <li><NavLink to="/main/dashboard" >ITOMS 운영현황 (사이트관리자)</NavLink></li>
                    <li><NavLink to="/main/corpmanager">기업관리자 계정관리 (사이트관리자)</NavLink></li>
                    <li><NavLink to="/main/usermanager">사용자 계정관리 (기업) </NavLink></li>
                    <li><NavLink to="/main/devicemanager">장비현황  (기업,사용자)</NavLink></li>

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
                        nowMember?.nowMember.length>0 &&
                        <div className='now_user_info'>
                            <div>접속자 : {nowMember.nowMember[0].name}</div>
                            <div>접속아이디 : {nowMember.nowMember[0].id}</div>
                            <div>아이디 : {nowMember.nowMember[0].company_no.company_name}</div>
                            <hr/>
                        </div>
                    }
                    <Contents/>
                </main>

            </MainContainer>
    )
}
export default Main;