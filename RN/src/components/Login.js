import React from "react";
import styled from "@emotion/native";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { LOGINUSER } from "../graphql/query";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { ScrollView } from "react-native";

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

  const onLogin = async (e) => {
    if (data) {
      refetch();
      console.log(data.loginUser.user.address);
      // name.current.focus();
      await SecureStore.setItemAsync("login-token", data.loginUser.token);
      await SecureStore.setItemAsync(
        "nick_name",
        data.loginUser.user.nick_name
      );
      await SecureStore.setItemAsync("address", data.loginUser.user.address);
      navigation.navigate("home");
    } else {
      alert("회원정보가 없습니다.");
    }
  };

  const { data, refetch } = useQuery(LOGINUSER, {
    variables: {
      loginUserId: id,
      password: password,
    },
    pollInterval: 500,
  });

  return (
    <Base>
      <Title>INFOFLA</Title>
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
