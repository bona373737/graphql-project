import React from "react";
import { Link } from "react-router-dom";

const Home =()=>{

    return(
        <>
            <Link to="/login">Login</Link>
            <p>~~~반갑습니다 HOME화면 입니다~~</p>
        </>
    )
}
export default Home;