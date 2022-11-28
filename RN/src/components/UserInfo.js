import React from "react";
import styled from "@emotion/native";
import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGINUSER, USER_INFO } from "../graphql/query";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { KeyboardAvoidingView, Platform, Text } from "react-native";

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

const InfoContainer = styled.View`
  margin: 10% 5%;
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

function UserInfo() {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [prevAddress, setPrevAddress] = useState("");

  const nick = async () => {
    setName(await SecureStore.getItemAsync("nick_name"));
  };
  nick();

  const addressInfo = async () => {
    setPrevAddress(await SecureStore.getItemAsync("address"));
  };
  addressInfo();

  const onLogin = async (e) => {
    try {
      await SecureStore.deleteItemAsync("address");
      await SecureStore.setItemAsync("address", address);
      await updateUser();
      navigation.navigate("settingpage");
    } catch (error) {
      alert("error ", error);
    }
  };

  const [updateUser, { data, loading, error }] = useMutation(USER_INFO, {
    variables: {
      updateUserId: name,
      address: address,
    },
  });

  return (
    // <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
    <Base>
      <Title>INFOFLA</Title>
      <Container>
        <InfoContainer>
          <Text style={{ fontSize: 20, marginBottom: 5 }}>
            <Text style={{ color: "blue", fontWeight: "bold" }}>{name}</Text>님
            안녕하세요
          </Text>
          <Text style={{ fontSize: 20, marginBottom: 5 }}>
            주소: {prevAddress}
          </Text>
        </InfoContainer>
        <LoginContainer>
          <LoginText
            placeholder="수정할 주소를 입력하세요"
            type="text"
            onChangeText={(text) => setAddress(text)}
          />
        </LoginContainer>
        <LoginButton
          title="수정"
          color="#7DD421"
          onPress={onLogin}
        ></LoginButton>
      </Container>
    </Base>
    // </KeyboardAvoidingView>
  );
}

export default UserInfo;
