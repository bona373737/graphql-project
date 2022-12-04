
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {useLazyQuery, makeVar, useReactiveVar, makeReference} from '@apollo/client';
import {GET_LOGINMEMBER} from '../graphql/query';
import { useCallback, useEffect, useState } from 'react';
import { nowMemberInVar } from '../makeVar';

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
      onCompleted:(data)=>{
          //useLazyQuery execute성공시 token->localStorage에 저장, memberData->전역변수로 저장
          console.log(data)
          console.log("onComleted!!!!!!!")
          localStorage.setItem("loginToken", data.loginMember.token);
          nowMemberInVar([data.loginMember.memberData])   
      }
    });
      
    const onSubmitLogin=async(e)=>{
      e.preventDefault();
      try {
        //useLazyQuery executes 
        const inputData ={id:e.target.id.value, password:e.target.password.value};
        await login({variables:inputData})
        history.push({pathname:"/main"})
      } catch (error) {
        alert("아이디 또는 비밀번호 오류 입니다.");
        throw error;
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