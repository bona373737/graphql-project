import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function StackNav() {
  return (
    <Text>
      StackNav
    </Text>
    // <Stack.Navigator>
    //   <Stack.Screen
    //     name="home"
    //     component={Home}
    //     options={{
    //       title: "INFOFLA",
    //       // Header 블록에 대한 스타일
    //       headerStyle: {
    //         backgroundColor: "#ffffff",
    //       },
    //       // Header의 텍스트, 버튼 색상
    //       headerTintColor: "#111",
    //       // 타이틀 텍스트의 스타일r
    //       headerTitleStyle: {
    //         fontWeight: "bold",
    //         fontSize: 28,
    //       },
    //     }}
    //     // options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="login"
    //     component={LoginPage}
    //     options={{
    //       title: "로그인",
    //       // Header 블록에 대한 스타일
    //       headerStyle: {
    //         backgroundColor: "#ffffff",
    //       },
    //       // Header의 텍스트, 버튼 색상
    //       headerTintColor: "#111",
    //       // 타이틀 텍스트의 스타일
    //       headerTitleStyle: {
    //         fontSize: 25,
    //       },
    //     }}
    //   />
    // </Stack.Navigator>
  );
}