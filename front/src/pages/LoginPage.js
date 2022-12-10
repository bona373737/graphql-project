
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {useLazyQuery, makeVar, useReactiveVar, makeReference} from '@apollo/client';
import {GET_LOGINMEMBER} from '../graphql/query';
import { useCallback, useEffect, useState } from 'react';
// import { nowMemberInVar } from '../makeVar';

const LoginContainer = styled.div`
  box-sizing: border-box;
  width: 300px;
  height: 500px;
  padding: 0 50px;
  border-radius: 5px;
  background-color: var(--gray);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .form_title{
    margin: 60px 0;
    text-align: center;
  }
  .login_form{
    display: flex;
    flex-direction: column;
    justify-items: flex-end;
    margin: 80px auto;
    input{
      padding: 10px 0;
      margin: 12px 0;
      border-radius: 5px;
      border: none;
      text-indent: 5px;
      :focus{
        outline: none;
      }
    }
    button{
      padding: 5px 0;
      margin: 80px 0;
      border-radius: 5px;
      :hover{
        cursor: pointer;
        background-color: white;
      }

    }
  }
`;

const LoginPage=()=>{
    const history = useHistory();

    const [login, {loading,error,data}] = useLazyQuery(GET_LOGINMEMBER,{
      fetchPolicy:'no-cache',
      onCompleted:(data)=>{
        console.log(data)
        console.log("onComleted!!!!!!!")
        //서버측에서 error를 던져도 useLazyQuery.onError가 동작하지 않음. 
        //서버에서 에러발생되어 return 받은 데이터가 null이어도 onCompleted로 인신되는 상태
        //반환값 형태 {loginMember: null}
        if(data.loginMember === null){
          alert("아이디 또는 비밀번호 오류입니다.")
          return;
        }

        localStorage.setItem("loginToken", data.loginMember.token);
        localStorage.setItem("loginUser", JSON.stringify(data.loginMember.memberData));
        // nowMemberInVar([data.loginMember.memberData])   

        history.push({pathname:"/main"});
      },
      onError:(error)=>{
        alert("onError:" +error.message);
        return;
      }
    });
      
    const onSubmitLogin=async(e)=>{
      e.preventDefault();
      const data = localStorage.getItem("loginToken");
      if(data){
        localStorage.removeItem("loginToken");
      }

      try {
        //useLazyQuery executes 
        const inputData ={id:e.target.id.value, password:e.target.password.value};
        await login({variables:inputData})

      } catch (error) {
        alert("submit error" + error.message);
        return;
      }    
    };

    return(
        <LoginContainer>
            <h1 className='form_title'>OJT_ITOMS</h1>
            <form className='login_form' onSubmit={onSubmitLogin}>
              <label htmlFor="id">아이디</label>
              <input id="id" type="text" placeholder='아이디를 입력해주세요' ></input>
              <label htmlFor="password">비밀번호</label>
              <input id="password" type="password" placeholder='비밀번호를 입력해주세요'></input>
              <button>로그인</button>
            </form>
        </LoginContainer>
    )
}

export default LoginPage;