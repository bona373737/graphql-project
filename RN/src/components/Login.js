import React from "react";
import styled from "@emotion/native";
import { useState } from "react";
import { useQuery,useLazyQuery } from "@apollo/client";
import { LOGINUSER } from "../graphql/query";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native";
///////////////
import {GET_loginMember} from "../graphql/query";



const Base = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 60px;
  font-weight: bold;
  margin-bottom: 5%;
`;

const Container = styled.View`
  width: 70%;
`;

const LoginContainer = styled.View`
  border: 1px solid #afafaf;
  margin-bottom: 5px;
  border-radius: 10px;
  height: 34px;
`;

const LoginText = styled.TextInput`
  margin-left: 5px;
  font-size: 20px;
  height: 100%;
`;

const LoginButton = styled.Button``;

function Login() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  // const name = useRef();

  // const { data, refetch } = useQuery(LOGINUSER, {
  //   variables: {
  //     loginUserId: id,
  //     password: password,
  //   },
  //   pollInterval: 500,
  // });

  // const [login, {loading, data, error}] = useLazyQuery(GET_loginMember);


  // const onLogin = async (e) => {
  //   if (data) {
  //     refetch();
  //     // name.current.focus();
  //     await SecureStore.setItemAsync("login-token", data.loginUser.token);
  //     await SecureStore.setItemAsync(
  //       "nick_name",
  //       data.loginUser.user.nick_name
  //     );
  //     await SecureStore.setItemAsync("address", data.loginUser.user.address);
  //     navigation.navigate("home");
  //   } else {
  //     alert("회원정보가 없습니다.");
  //   }
  // };

  const [login, {loading,error,data}] = useLazyQuery(GET_loginMember,{
    onCompleted:(data)=>{
        //useLazyQuery execute성공시 localStorage에 저장
        SecureStore.setItemAsync("loginToken", data.loginMember.token);
        SecureStore.setItemAsync("loginUser", JSON.stringify(data.loginMember.memberData));
      }
  });

  const onLogin=async(e)=>{
    e.preventDefault();
    try {
      //useLazyQuery executes 
      const inputData ={id:e.target.id.value, password:e.target.password.value};
      await login({variables:inputData})
      navigation.navigate("main");
    } catch (error) {
      alert("아이디 또는 비밀번호 오류 입니다.");
    }    
  };


  return (
    <Base>
      <Title>OJT_ITOMS</Title>
      <Container>
        <LoginContainer>
          <LoginText
            placeholder="아이디를 입력하세요"
            onChangeText={(text) => setId(text)}
          />
        </LoginContainer>
        <LoginContainer>
          <LoginText
            secureTextEntry={true}
            placeholder="비밀번호를 입력하세요"
            onChangeText={(text) => setPassword(text)}
          />
        </LoginContainer>
        <LoginButton
          title="로그인"
          color="#7DD421"
          onPress={onLogin}
        ></LoginButton>
      </Container>
    </Base>
  );
}

export default Login;
