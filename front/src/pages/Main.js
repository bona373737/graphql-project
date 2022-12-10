import {Link, NavLink, useHistory } from 'react-router-dom';
import styled from "styled-components"
// import { nowMemberInVar } from '../makeVar';
import Contents from "../components/Contents";
import { useQuery, useReactiveVar } from '@apollo/client';
import {GET_NOWMEMBER } from "../graphql/query";
import { useEffect } from 'react';
import { useState } from 'react';

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
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 80%;
        .now_user_info{
            display: flex;
            justify-content: flex-end;
            align-items: center;
            min-height: 38px;
            min-width: 600px;
            div{
                margin: 0 16px;
            }
        }
    }
`;
 
const Main =()=>{
    //makeVar사용..로그인정보저장..새로고침시 reset되는 상태
    // const {data:nowMember} = useQuery(GET_NOWMEMBER);
    // console.log(nowMember);

    const history = useHistory();
    const [role, setRole] = useState();
    const [loginUser, setLoginUser] = useState();

    useEffect(()=>{
        const loginUser = JSON.parse(localStorage.getItem("loginUser"));
        setLoginUser(loginUser);
        setRole(loginUser.role_no);

        if(!loginUser.isavailable === 0){
            alert("유효하지 않은 계정입니다.")
            history.push("/login");
        }
    },[])

    return(
            <MainContainer>
                <aside>
                    <h1>OJT_ITOMS</h1>
                    <ul className='menu_list'>
                        { role &&
                            role === 1? (
                                <>
                                <li><NavLink to="/main/dashboard" >ITOMS 운영현황</NavLink></li>
                                <li><NavLink to={{pathname:"/main/membermanager"}}>기업관리자 계정관리</NavLink></li>
                                </>
                            ): role === 2? (
                                <>
                                <li><NavLink to={{pathname:"/main/membermanager"}}>사용자 계정관리 </NavLink></li>
                                <li><NavLink to={{pathname:"/main/devicemanager"}}>장비현황 </NavLink></li>
                                </>
                                ) : (
                                    <>
                                    <li><NavLink to={{pathname:"/main/devicemanager"}}>장비현황 </NavLink></li>
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
                        loginUser &&
                        <>
                        <div className='now_user_info'>
                            <div>접속자 : {loginUser.name}</div>
                            <div>접속아이디 : {loginUser.id}</div>
                            { loginUser?.company_no?.company_no &&
                            <div>기업명 : {loginUser.company_no.company_name}</div>
                            }
                        </div>
                        <hr/>
                        </>
                    }
                    <Contents/>
                </main>
            </MainContainer>
    )
}
export default Main;