import React, { useState } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Cart from "../pages/Cart";
import Icon from "react-native-vector-icons/AntDesign";
import StackNav from "../navigation/StackNav";
import * as SecureStore from "expo-secure-store";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import UserInfoStack from "./UserInfoStack";

const Tab = createMaterialBottomTabNavigator();

function BottomTab() {
  const [token, setToken] = useState("");

  const tokenStore = async () => {
    try {
      const res = await SecureStore.getItemAsync("login-token");
      console.log(res);
      setToken(res);
    } catch (error) {
      console.log(error);
    }
  };

  tokenStore();

  return (
    <Tab.Navigator
      activeColor="#7DD421"
      inactiveColor="#adadad"
      barStyle={{ backgroundColor: "#ffffff" }}
    >
      <Tab.Screen
        name="Root"
        component={StackNav}
        options={{
          tabBarOptions: { labelStyle: 20 },
          headerShown: false,
          tabBarLabel: "홈",
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Icon name="home" size={25} color={"#7DD421"} />
            ) : (
              <Icon name="home" size={25} color={"#adadad"} />
            ),
        }}
      />
      {token ? (
        <>
          <Tab.Screen
            name="shopping"
            component={Cart}
            options={{
              headerShown: false,
              tabBarLabel: "결제내역",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Icon name="shoppingcart" size={24} color={"#7DD421"} />
                ) : (
                  <Icon name="shoppingcart" size={24} color={"#adadad"} />
                ),
            }}
          />
          <Tab.Screen
            name="setting"
            component={UserInfoStack}
            options={{
              headerShown: false,
              tabBarLabel: "설정",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Icon name="setting" size={25} color={"#7DD421"} />
                ) : (
                  <Icon name="setting" size={25} color={"#adadad"} />
                ),
            }}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            name="login"
            component={LoginPage}
            options={{
              headerShown: false,
              tabBarLabel: "로그인",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Icon name="login" size={24} color={"#7DD421"} />
                ) : (
                  <Icon name="login" size={24} color={"#adadad"} />
                ),
            }}
          />
          <Tab.Screen
            name="register"
            component={RegisterPage}
            options={{
              headerShown: false,
              tabBarLabel: "회원가입",
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Icon name="user" size={25} color={"#7DD421"} />
                ) : (
                  <Icon name="user" size={25} color={"#adadad"} />
                ),
            }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

export default BottomTab;
