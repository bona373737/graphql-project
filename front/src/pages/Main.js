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
        min-width: 200px;
        width: 20%;
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
    //makeVar사용..로그인정보저장..새로고침시 reset되는 상태
    const {data:nowMember} = useQuery(GET_NOWMEMBER);
    console.log(nowMember);

    //localStorage사용..로그인정보저장
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    console.log(loginUser)

    return(
            <MainContainer>
                <aside>
                    <h1>OJT_ITOMS</h1>
                    <ul className='menu_list'>
                        { loginUser?.role_no &&
                            loginUser?.role_no === 1? (
                                <>
                                <li><NavLink to="/main/dashboard" >ITOMS 운영현황</NavLink></li>
                                <li><NavLink to={{pathname:"/main/corpmanager"}}>기업관리자 계정관리</NavLink></li>
                                </>
                            ): loginUser?.role_no ===2? (
                                <>
                                <li><NavLink to={{pathname:"/main/usermanager"}}>사용자 계정관리 (기업) </NavLink></li>
                                <li><NavLink to={{pathname:"/main/devicemanager"}}>장비현황  (기업,사용자)</NavLink></li>
                                </>
                                ) : (
                                    <>
                                    <li><NavLink to={{pathname:"/main/devicemanager"}}>장비현황  (기업,사용자)</NavLink></li>
                                    </>
                                    )
                                }
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
                            <div>기업명 : {nowMember.nowMember[0].company_no.company_name}</div>
                            <hr/>
                        </div>
                    }
                    <Contents/>
                </main>

            </MainContainer>
    )
}
export default Main;