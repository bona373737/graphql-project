import React from "react";
import styled from "@emotion/native";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";

const Base = styled.View`
  margin: auto;
  background-color: white;
  width: 50%;
  height: 20%;
  flex-direction: column;
  justify-content: space-between;
  border: 10px solid white;
`;

const Button = styled.Button``;

function SettingPage() {
  const navigation = useNavigation();

  const onUserInfo = () => {
    navigation.navigate("userInfo");
  };

  const onLogout = async () => {
    await SecureStore.deleteItemAsync("login-token");
    await SecureStore.deleteItemAsync("address");
    console.log(
      await SecureStore.getItemAsync("login-token"),
      await SecureStore.getItemAsync("address")
    );
    navigation.navigate("home");
  };

  return (
    <Base>
      <Button color="#7DD421" title="정보수정" onPress={onUserInfo} />
      <Button color="#7DD421" title="로그아웃" onPress={onLogout} />
    </Base>
  );
}

export default SettingPage;
