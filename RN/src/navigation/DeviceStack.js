import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import DeviceManager from "../components/DeviceManager";
import AddDevice from "../components/AddDevice";


const Stack = createStackNavigator();

export default function DeviceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DeviceManager"
        component={DeviceManager}
        options={{
          title: "장비관리",
          //back button disappear
          headerLeft:()=>null,
          // Header 블록에 대한 스타일
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          // Header의 텍스트, 버튼 색상
          headerTintColor: "#111",
          // 타이틀 텍스트의 스타일
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />
      <Stack.Screen
        name="AddDevice"
        component={AddDevice}
        options={{
          title: "장비등록",
          //back button disappear
          headerLeft:()=>null,
          // Header 블록에 대한 스타일
          headerStyle: {
            backgroundColor: "#ffffff",
          },
          // Header의 텍스트, 버튼 색상
          headerTintColor: "#111",
          // 타이틀 텍스트의 스타일
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,
          },
        }}
      />
    </Stack.Navigator>
  );
}
