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

import BottomTab from "./src/navigation/BottomTab";

const Stack = createStackNavigator();

const httpLink = new HttpLink({
  uri: "http://10.90.101.24:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
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
              name="start"
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
