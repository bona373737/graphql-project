import {Link, NavLink, useHistory } from 'react-router-dom';
// import { nowMemberInVar } from '../makeVar';
import { useQuery, useReactiveVar } from '@apollo/client';
import {GET_NOWMEMBER } from "../graphql/query";
import { useEffect } from 'react';
import { useState } from 'react';

//components
import Contents from "../components/Contents";
//style
import styled from "styled-components"
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineRouter } from 'react-icons/md';
import logoImg from "../assets/img/logo.png"

const MainContainer = styled.div`
    height: 100vh;
    box-sizing: border-box;
    width: 100%;
    display:flex;
    background-color: var(--subColor);
    
    aside{
        min-width: 200px;
        width: 20%;
        background-color: var(--mainColor); 
        .logo{
            font-weight: bold;
            color: white;
            margin: 30px 0;
            font-size: 20px;
            text-align: center;
            img{
                width: 30px;
                padding: 0 4px;
                /* filter: invert(46%) sepia(38%) saturate(6955%) hue-rotate(218deg) brightness(103%) contrast(100%); */
            }
        }
        .sidebar{
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .menu_list{
                text-align: center;
                li{
                    margin: 20px 0;
                    text-align: left;
                    
                    a{
                        color: var(--fontMainColor);
                        display: block;
                        width: 100%;
                        line-height: 40px;
                        &:hover{
                            background-image: linear-gradient(to left, var(--pointColor),10%, var(--mainColor));
                        }
                        svg{
                            padding: 0 8px;
                        }
                    }
                    .active{
                        color: var(--fontMainColor);
                        background-image: linear-gradient(to left, var(--pointColor),10%, var(--mainColor));
                    }
                }
            }
            .logout{
                button{
                    background-color: var(--mainColor);
                    color: var(--fontMainColor);
                    svg{
                        padding: 0 5px;
                    }
                }
                
            }
        }
    }
    main{
        display: flex;
        flex-direction: column;
        width: 80%;
        .user_info_wrap{
            background-color:var(--mainColor);
            height: 60px;
            .now_user_info{
                line-height: 60px;
                color: var(--fontMainColor);
                display: flex;
                justify-content: flex-end;
                align-items: center;
                /* margin-bottom: 20px; */
                /* min-height: 38px; */
                font-size: 12px;
                div{
                    margin: 0 16px;
                }
            }
        }
        .content_wrap{
            flex: 1;
            overflow-y: auto;
            background-color: var(--mainColor);
            ::-webkit-scrollbar{
             display: none;
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
                    <h1 className='logo'><img src={logoImg}/>OJT_ITOMS</h1>
                    <section className='sidebar'>
                        <ul className='menu_list'>
                            { role &&
                                role === 1? (
                                    <>
                                    <li><NavLink to="/main/dashboard" ><MdDashboard/>ITOMS 운영현황</NavLink></li>
                                    <li><NavLink to={{pathname:"/main/membermanager"}}><FaUsers/>기업관리자 계정관리</NavLink></li>
                                    </>
                                ): role === 2? (
                                    <>
                                    <li><NavLink to={{pathname:"/main/membermanager"}}><FaUsers/>사용자 계정관리 </NavLink></li>
                                    <li><NavLink to={{pathname:"/main/devicemanager"}}><MdOutlineRouter/>장비현황 </NavLink></li>
                                    </>
                                    ) : (
                                        <>
                                        <li><NavLink to={{pathname:"/main/devicemanager"}}><MdOutlineRouter/>장비현황 </NavLink></li>
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
                        <div className='logout'>
                            <button><FiLogOut/>logout</button>
                        </div>
                    </section>
                </aside>
                <main>
                    <section className='user_info_wrap'>
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
                            </>
                        }
                    </section>
                    <section className='content_wrap'>
                        <Contents/>
                    </section>
                </main>
            </MainContainer>
    )
}
export default Main;