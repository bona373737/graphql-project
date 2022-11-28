import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Product from "../components/Product";
import Cart from "./Cart";
import * as SecureStore from "expo-secure-store";

const Home = () => {
  const [name, setName] = useState("");

  const nick = async () => {
    setName(await SecureStore.getItemAsync("nick_name"));
  };
  nick();

  console.log(name);

  return (
    <>
      <Product nick_name={name} />
    </>
  );
};

export default Home;
