import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import Dashboard from "../components/Dashboard";
import AddCompany from "../components/AddCompany";
import DeviceManager from "../components/DeviceManager";
import AddDevice from "../components/AddDevice";


const Stack = createStackNavigator();

export default function Home() {
  return (
    <Stack.Navigator  >
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "ITOMS운영현황",
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
        name="AddCompany"
        component={AddCompany}
        options={{
          title: "신규기업등록",
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
        name="DeviceManager"
        component={DeviceManager}
        options={{
          title: "장비 목록",
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
