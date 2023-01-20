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
import { MdOutlineCastForEducation } from 'react-icons/md';
import { CgHello } from 'react-icons/cg';
import { FaUsers } from 'react-icons/fa';
import { MdOutlineRouter } from 'react-icons/md';
import logoImg from "../assets/img/logo.png"

const MainContainer = styled.div`
    header{
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 0.2px solid var(--gray);
        position: fixed;
        top:0;
        left: 0;
        box-sizing: border-box;
        padding: 0 30px;
        background-color: white;
        z-index: 1;
        .menu_wrap{
            display: flex;
            width: 400px;
            justify-content: space-between;
            align-items: center;

            
            .logo{
                display: flex;
                align-items: center;
                font-size: 20px;
                svg{
                    margin-right: 5px;
                    font-size: 30px;
                    color: var(--fontblack);
                }
            }
            
            nav{
                width: 280px;
                display: flex;
                justify-content: space-around;
            }
        }
    }
    
`;
 
const Main =()=>{
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
                <header>
                    <div className='menu_wrap'>
                        <div className='logo'><MdOutlineCastForEducation/><span>OJT</span></div>
                        <nav>
                            { role &&
                                role === 1? (
                                    <>
                                    <li><NavLink to="/main/dashboard" >ITOMS 운영현황</NavLink></li>
                                    <li><NavLink to={{pathname:"/main/membermanager"}}>기업관리자 계정관리</NavLink></li>
                                    </>
                                ): role === 2? (
                                    <>
                                    <li><NavLink to={{pathname:"/main/membermanager"}}>사용자 계정관리</NavLink></li>
                                    <li><NavLink to={{pathname:"/main/devicemanager"}}>장비현황</NavLink></li>
                                    </>
                                    ) : (
                                        <>
                                        <li><NavLink to={{pathname:"/main/devicemanager"}}>장비현황</NavLink></li>
                                        </>
                                        )
                                    }
                        </nav>
                    </div>
                    <div className='user_info_wrap'>
                        {
                            loginUser &&
                            <div><CgHello/>안녕하세요. {loginUser.name}님!</div>                            
                        }
                    </div>
                </header>
                <main>
                    <Contents/>
                </main>
            </MainContainer>
    )
}
export default Main;