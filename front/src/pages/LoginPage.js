
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {useLazyQuery, makeVar, useReactiveVar, makeReference} from '@apollo/client';
import {GET_LOGINMEMBER} from '../graphql/query';

const LoginContainer = styled.div`
  box-sizing: border-box;
  width: 300px;
  margin: auto;
  padding: 0 30px;
  background-color: gray;

  .login_form{
    display: flex;
    flex-direction: column;
    margin: auto;

    .login_title{
      margin: 20px 0;
    }

    input{
      margin: 5px 0;
    }
  }
`;

export const makeVarTest = makeVar();

const LoginPage=()=>{
    const history = useHistory();
    let nowMember;

    const [login, {loading,error,data}] = useLazyQuery(GET_LOGINMEMBER,{
      onCompleted:data=>{
        //로그인성공시 token->로컬스토리지에 저장, memberData->전역변수로 저장
        localStorage.setItem("loginToken", data.loginMember.token);
        makeVarTest([data.loginMember.memberData])
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
      history.push({pathname:"/main"})
    };
    
    // React.useEffect(() => {
      // localStorage.setItem("login-token", data?.loginMember.token);  
    // }, [data])

    return(
        <LoginContainer>
            <h1 className='login_title'>ITOMS</h1>
            <form className='login_form' onSubmit={onSubmitLogin}>
              <input id="id" type="text" ></input>
              <input id="password" type="password" ></input>
              <button>로그인</button>
            </form>
        </LoginContainer>
    )
}

export default LoginPage;