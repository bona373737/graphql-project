import React from "react";
import styled from "styled-components";
import { Link,useHistory } from "react-router-dom";
import homeImg from "../assets/img/home_image.jpg";

const HomeContainer=styled.div`
    nav{
        background-color: "#E0E0E0";
        display: flex;
        justify-content: space-between;
    }
    main{
        background:url(homeImg)
    }
`;

const Home =()=>{
    const history = useHistory();

    return(
        <HomeContainer>
            <nav>
                <div className="logo" onClick={()=>{history.push('/')}}>
                    <img src=""></img>
                    <h1>OJT_ITOMS</h1>
                </div>
                <button onClick={()=>{history.push('/login')}}>Login</button>
            </nav>
            <main>
                <p>~~~ HOME화면 입니다~~</p>
            </main>
        </HomeContainer>
    )
}
export default Home;