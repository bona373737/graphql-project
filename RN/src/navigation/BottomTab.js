import React, { useState,useEffect } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

import Dashboard from "../components/Dashboard";
import Corpmanager from  "../components/CorpManager";
import DeviceManager from "../components/DeviceManager"
import UserManager from "../components/UserManager"
import LoginMember from "../components/LoginMember"
import Home from "../pages/Home";
import DashboardStack from "../navigation/DashboardStack";
import DeviceStack from "./DeviceStack";
import CorpStack from "./CorpStack";
import UserStack from "./UserStack";

const styles = StyleSheet.create({
  headerStyle:{
    textAlign: 'center',
    marginTop:'20px'

  }
});

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  const [ loginMemberData, setLoginMemberData] = useState();

  const getLoginMemberData=async()=>{
      const data = await SecureStore.getItemAsync("loginUser");
      setLoginMemberData(JSON.parse(data));
  }

  useEffect(()=>{
      getLoginMemberData();
  },[])
  console.log(loginMemberData)

  return (
    loginMemberData &&
      <Tab.Navigator
      activeColor="#7DD421"
      inactiveColor="#adadad"
      barStyle={{ backgroundColor: "#ffffff" }}
      >
   
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarOptions: { labelStyle: 20 },
          tabBarLabel: "접속자",
          tabBarIcon: ({ focused }) =>
          focused ? (
              <IconAntDesign name="home" size={25} color={"#7DD421"} />
              ) : (
                <IconAntDesign name="home" size={25} color={"#adadad"} />
                ),
              }}
      />
    

        {/* 로그인 계정의 Role_no가 1(사이트관리자)일때 */}
        {loginMemberData?.role_no === 1 &&
          <>
          <Tab.Screen
            name="DashboardStack"
            component={DashboardStack}
            options={{
              tabBarOptions: { labelStyle: 20 },
              headerShown: false,
              tabBarLabel: "ITOMS운영현황",
              tabBarIcon: ({ focused }) =>
              focused ? (
                <Icon name="factory" size={25} color={"#7DD421"} />
                ) : (
                  <Icon name="factory" size={25} color={"#adadad"} />
                  ),
                }}
                />
          <Tab.Screen
            name="CorpStack"
            component={CorpStack}
            options={{
              headerShown: false,
              tabBarLabel: "계정관리",
              tabBarIcon: ({ focused }) =>
              focused ? (
                <Icon name="account-group" size={25} color={"#7DD421"} />
                ) : (
                  <Icon name="account-group" size={25} color={"#adadad"} />
                  ),
                }}
          /> 
          </>
        }


        {/* 로그인 계정의 Role_no가 2(기업관리자)일때 ========================================== */}
        {loginMemberData?.role_no === 2 &&
        <>
        <Tab.Screen
          name="DeviceStack"
          component={DeviceStack}
          options={{
            tabBarOptions: { labelStyle: 20 },
            headerShown: false,
            tabBarLabel: "장비관리",
            tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="home" size={25} color={"#7DD421"} />
              ) : (
                <Icon name="home" size={25} color={"#adadad"} />
                ),
              }}
              />
        <Tab.Screen
          name="UserStack"
          component={UserStack}
          options={{
            headerShown: false,
            tabBarLabel: "사용자관리",
            tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="account-group" size={25} color={"#7DD421"} />
              ) : (
                <Icon name="account-group" size={25} color={"#adadad"} />
                ),
              }}
          /> 
        </>
        }
        
        {/* 로그인계정의 role_no가 3(사용자일때)======================================================= */}
        {loginMemberData?.role_no === 3 &&
        <Tab.Screen
          name="User_DeviceManager"
          component={DeviceManager}
          options={{
            headerShown: false,
            tabBarLabel: "장비관리",
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Icon name="factory" size={25} color={"#7DD421"} />
              ) : (
                <Icon name="factory" size={25} color={"#adadad"} />
              ),
          }}
        />
        }
    </Tab.Navigator>
  );
}

export default BottomTab;
