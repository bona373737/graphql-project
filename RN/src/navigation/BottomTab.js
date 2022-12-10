import React, { useState,useEffect } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as SecureStore from "expo-secure-store";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { View, Text, StyleSheet } from "react-native";

import Dashboard from "../components/Dashboard";
import Corpmanager from  "../components/CorpManager";
import DeviceManager from "../components/DeviceManager"
import MemberManager from "../components/MemberManager"
import LoginMember from "../components/LoginMember"
import Home from "../pages/Home";
import DashboardStack from "../navigation/DashboardStack";
import DeviceStack from "./DeviceStack";
import CorpStack from "./CorpStack";
import UserStack from "./UserStack";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  headerStyle:{
    textAlign: 'center',
    marginTop:'20px'

  }
});

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  const navigation = useNavigation();
  const [ loginMemberData, setLoginMemberData] = useState();

  const getLoginMemberData=async()=>{
      let data = await SecureStore.getItemAsync("loginUser");
      data = JSON.parse(data);
      if(data){
        return data;
      }
  }

  useEffect(()=>{
      getLoginMemberData().then((data)=>{
        setLoginMemberData(data)
      });
  },[])
  // console.log(loginMemberData)

  /** 탭이동시 내부의 stack 초기화... */
  const handleTabPress = ({ navigation,defaultHandler}) => {
    const firstLevelState = navigation.state;

    if (firstLevelState.index !== 0) {
      navigation.popToTop({ immediate: true });

      const secondLevelState = firstLevelState.routes[firstLevelState.index];
      if (secondLevelState.index !== 0) {
        navigation.popToTop({ immediate: true });
      }
    }
    defaultHandler();

    // navigation.popToTop();
    // defaultHandler();
    
    // navigation.popToTop();
    // navigation.navigate(navigation.state.routeName);
  }
  // const resetHomeStackOnTabPress = ({ navigation, route }) => ({
  //   tabPress: (e) => {
  //     const state = navigation.dangerouslyGetState();
  
  //     if (state) {
  //       // Grab all the tabs that are NOT the one we just pressed
  //       const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);
  
  //       nonTargetTabs.forEach((tab) => {
  //         // Find the tab we want to reset and grab the key of the nested stack
  //         const tabName = tab?.name;
  //         const stackKey = tab?.state?.key;
  
  //         if (stackKey && tabName === TAB_TO_RESET) {
  //           // Pass the stack key that we want to reset and use popToTop to reset it
  //           navigation.dispatch({
  //             ...StackActions.popToTop(),
  //             target: stackKey,
  //           });
  //         }
  //       });
  //     }
  //   },
  // });

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
          tabPress:handleTabPress,
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
            // listeners={({ navigation }) => ({
            //   //다른 탭에 이동했다가 돌아왔을때 첫번째 stack으로 이동
            //   //https://github.com/react-navigation/react-navigation/issues/1557
            //   tabPress: (e) => {
            //     e.preventDefault();
            //     navigation.navigate("Dashboard")
            //   }
            // })}
            options={{
              tabPress:handleTabPress,
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
