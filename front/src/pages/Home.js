import React from "react";
import styled from "styled-components";
import { Link,useHistory } from "react-router-dom";
import homeImg from "../assets/img/home_image.jpg";

const HomeContainer=styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    nav{
        height: 60px;
        background-color: var(--gray);
        padding: 0 50px;
        display: flex;
        justify-content: space-between;

        .logo_wrap{
            display: flex;
            align-items: center;
        }
        .login_btn_wrap{
            display: flex;
            align-items: center;
            button{
                padding: 10px 20px;
                border-radius: 5px;
                :hover{
                    cursor: pointer;
                    background-color: white;
                }
            }
        }
    }
    main{
        /* max-height: 100%; */
        flex:1;
        background:url(${homeImg}) center top no-repeat;
        background-size: cover;
        overflow: hidden;
        h1{
            text-align: center;
            margin-top: 20%
        }
    }
`;

const Home =()=>{
    const history = useHistory();

    return(
        <HomeContainer>
            <nav>
                <div className="logo_wrap" onClick={()=>{history.push('/')}}>
                    <img src=""></img>
                    <h1>OJT_ITOMS</h1>
                </div>
                <div className="login_btn_wrap">
                    <button onClick={()=>{history.push('/login')}}>Login</button>
                </div>
            </nav>
            <main>
                <h1>안녕하세요. OJT_ITOMS 백오피스개발 과제 진행중입니다.</h1>
            </main>
        </HomeContainer>
    )
}
export default Home;