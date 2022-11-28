import React, { useEffect } from "react";
import styled from "@emotion/native";
import { useState } from "react";
import { RadioButton } from "react-native-paper";
import { ScrollView, Text } from "react-native";
import { CREACTUSER } from "../graphql/query";
import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";

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

const RegisterContainer = styled.View`
  border: 1px solid #afafaf;
  margin-bottom: 5px;
  border-radius: 10px;
  height: 34px;
`;

const RegisterText = styled.TextInput`
  margin-left: 5px;
  font-size: 20px;
  height: 100%;
`;

const RadioContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const RegisterButton = styled.Button``;

function Register() {
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [address, setAddress] = useState("");
  const [select, setSelect] = useState("0");

  const onRegister = async (e) => {
    e.preventDefault();
    try {
      await createUser();
    } catch (error) {
      alert("아이디 또는 닉네임이 존재합니다.");
    }
  };

  const [createUser, { data, loading, error }] = useMutation(CREACTUSER, {
    variables: {
      createUserId: id,
      password: password,
      name: name,
      nickName: nickName,
      address: address,
      admin: parseInt(select),
    },
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
      navigation.navigate("login");
    }
  }, [data]);

  return (
    <Base>
      <Title>INFOFLA</Title>
      <Container>
        <RegisterContainer>
          <RegisterText
            placeholder="아이디를 입력하세요"
            onChangeText={(text) => setId(text)}
          />
        </RegisterContainer>
        <RegisterContainer>
          <RegisterText
            secureTextEntry={true}
            placeholder="비밀번호를 입력하세요"
            type="password"
            onChangeText={(text) => setPassword(text)}
          />
        </RegisterContainer>
        <RegisterContainer>
          <RegisterText
            placeholder="이름(기업명)을 입력하세요"
            onChangeText={(text) => setName(text)}
          />
        </RegisterContainer>
        <RegisterContainer>
          <RegisterText
            placeholder="닉네임(기업명)을 입력하세요"
            onChangeText={(text) => setNickName(text)}
          />
        </RegisterContainer>
        <RegisterContainer>
          <RegisterText
            placeholder="주소를 입력하세요"
            onChangeText={(text) => setAddress(text)}
          />
        </RegisterContainer>
        <RadioContainer>
          <RadioButton
            value="0"
            status={select === "0" ? "checked" : "unchecked"}
            onPress={() => setSelect("0")}
          />
          <Text
            htmlFor="goal"
            style={{ marginTop: 8, marginRight: 10, marginLeft: -5 }}
          >
            사용자
          </Text>
        </RadioContainer>
        <RegisterButton
          title="회원가입"
          color="#7DD421"
          onPress={onRegister}
        ></RegisterButton>
      </Container>
    </Base>
  );
}

export default Register;
