
import { Link, useHistory } from 'react-router-dom';
import {useLazyQuery} from '@apollo/client';
import {GET_LOGINMEMBER} from '../graphql/query';

const LoginPage=()=>{
    const history = useHistory();
    let nowMember;

    const [login, {loading,error,data}] = useLazyQuery(GET_LOGINMEMBER,{
      onCompleted:data=>{
        localStorage.setItem("loginToken", data.loginMember.token);
        localStorage.setItem("nowMemberRole", data.loginMember.memberData.role_no)
        // console.log(data.loginMember.memberData.role_no)
      }
    });

    const onSubmitLogin=async(e)=>{
      e.preventDefault();
      try {
        //useLazyQuery executes 
        const inputData ={id:e.target.id.value, password:e.target.password.value};
        nowMember = await login({variables:inputData})
        
      } catch (error) {
        
      }
      
      // console.log(nowMember.data);
      //login성공시 Main페이지로 이동
      history.push({pathname:"/main",state:nowMember.data})



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
            <p>로그인</p>
            <form onSubmit={onSubmitLogin}>
              <input id="id" type="text" ></input>
              <input id="password" type="password" ></input>
              <button>로그인</button>
            </form>
        </div>
    )
}
export default LoginPage;