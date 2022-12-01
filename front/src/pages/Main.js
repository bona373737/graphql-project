import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import {Link,useLocation } from 'react-router-dom';
import styled from "styled-components"
import Contents from "../components/Contents";
import { makeVarTest } from './LoginPage';

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
    const makeVar = makeVarTest();
    // const nowMember = makeVar? makeVar[0]: "";
    // console.log(makeVar)
    // const ddd = useReactiveVar(nowMember)
    // console.log(ddd);
    
    //이 방법...뒤로가기,앞으로가기 해도 location객체에 로그인정보가 계속남아있게 되는.. 
    //+ main의 하위컴포넌트ex)/main/dashboard로 이동시 Main컴포넌트의 location객체 정보 바뀌면서 오류발생..
    // const location = useLocation()
    // console.log(location)
    // const locationData = location.state.loginMember.memberData;


    // useEffect(()=>{
    //     if(location.state){
    //         setUser()
    //     }
    // },[location.state])
    // const nowMemberRole=localStorage.getItem("nowMemberRole");

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
                    {/* <h1>접속자 : {makeVar[0].name}</h1> */}
                    <hr/>
                    <Contents/>
                </main>

            </MainContainer>
    )
}
export default Main;