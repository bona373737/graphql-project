import React from "react";
import { Link,useHistory } from "react-router-dom";

const Home =()=>{
    const history = useHistory();

    return(
        <>
            <button onClick={()=>{history.push('/login')}}>Login</button>
            <p>~~~ HOME화면 입니다~~</p>
        </>
    )
}
export default Home;