
import { Link, useHistory } from 'react-router-dom';

import {useLazyQuery,useQuery} from '@apollo/client';
import {GET_LOGINMEMBER} from '../graphql/query';
import { useCallback, useState } from 'react';

const LoginPage=()=>{
    const history = useHistory();

    const [login, {loading,error,data}] = useLazyQuery(GET_LOGINMEMBER,{
      onCompleted:data=>{localStorage.setItem("login-token", data.loginMember.token);}
    });

    const onSubmitLogin=async(e)=>{
      e.preventDefault();
      try {
        //useLazyQuery executes 
        const inputData ={id:e.target.id.value, password:e.target.password.value};
        await login({variables:inputData})
        
      } catch (error) {
        
      }
      // useLazyQuery 실행성공시 반환받은 token값 localstorage에 저장   
      //https://stackoverflow.com/questions/65100383/how-to-get-uselazyquery-hooks-data-after-calling-a-function
      //useLazyQuery isn't return a promise, you should use onCompleted function parameter instead
      // console.log(data.loginMember.token);
      // localStorage.setItem("login-token", data?.loginMember.token);  
    };
      // React.useEffect(() => {
        // localStorage.setItem("login-token", data?.loginMember.token);  
      // }, [data])

    return(
        <div>
            <Link to="/main">로그인 후 Main페이지로 이동</Link>
            <form onSubmit={onSubmitLogin}>
              <input id="id" type="text" ></input>
              <input id="password" type="password" ></input>
              <button>로그인</button>
            </form>
        </div>
    )
}
export default LoginPage;