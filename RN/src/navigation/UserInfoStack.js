import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UserInfo from "../components/UserInfo";
import SettingPage from "../pages/SettingPage";

const Stack = createStackNavigator();

function UserInfoStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="settingpage"
        component={SettingPage}
        options={{
          title: "설정",
          // Header 블록에 대한 스타일
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          // Header의 텍스트, 버튼 색상
          headerTintColor: "#111",
          // 타이틀 텍스트의 스타일
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 28,
          },
        }}
        // options={{ headerShown: false }}
      />
      <Stack.Screen
        name="userInfo"
        component={UserInfo}
        options={{
          title: "정보수정",
          // Header 블록에 대한 스타일
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          // Header의 텍스트, 버튼 색상
          headerTintColor: "#111",
          // 타이틀 텍스트의 스타일
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 28,
          },
        }}
        // options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default UserInfoStack;
