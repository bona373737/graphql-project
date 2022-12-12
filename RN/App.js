import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import * as SecureStore from "expo-secure-store";


import BottomTab from "./src/navigation/BottomTab";
import Login from "./src/pages/Login";
import { setContext } from "apollo-link-context";
import { from } from "apollo-link";

const Stack = createStackNavigator();

const httpLink = new HttpLink({
  uri: "http://10.90.100.169:4000/",
});

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: await SecureStore.getItemAsync("loginToken"),
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  // Bottom Tab Nav 이미지가 변경되지 않음

  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BottomTab"
              component={BottomTab}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}
