import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Product from "../components/Product";
import * as SecureStore from "expo-secure-store";

const Main = () => {


  return (
    <View>
      <Text>Main 페이지</Text>
      <Text>하단에 Bottom tab</Text>

    </View>
  );
};

export default Main;
