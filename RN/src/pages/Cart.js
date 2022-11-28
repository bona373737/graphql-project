import React, { useEffect, useState } from "react";
import { Image, Platform, ScrollView } from "react-native";
import styled from "@emotion/native";
import { useQuery } from "@apollo/client";
import { GET_PURCHASE_USER } from "../graphql/query";
import * as SecureStore from "expo-secure-store";
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from "@react-navigation/native";

const Base = styled.View`
  margin: 15% 5% 4% 5%;
`;

const Title = styled.Text`
  color: #50a020;
  font-size: 35px;
  font-weight: bold;
`;

const ProductContainer = styled.TouchableOpacity`
  margin-top: 4%;
  border-top-width: 1px;
  border-top-color: #cfcfcf;
  flex-direction: row;
`;

const ProductContext = styled.Text`
  margin: 15% 0 0 10%;
`;

const FlexContainer = styled.View``;

const Flex = styled.View``;

const ProductName = styled.Text`
  font-size: 25px;
  font-weight: bold;
  color: #7f7f7f;
`;

const Number = styled.Text`
  color: #8f8f8f;
  font-size: 15px;
`;

const TotalPrice = styled.Text`
  font-size: 16px;
`;

const NoProduct = styled.Text`
  margin: 50% 10% 0 10%;
  font-size: 30px;
`;

function Cart() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [osImg, setOsImg] = useState("");

  const nick = async () => {
    setName(await SecureStore.getItemAsync("nick_name"));
  };
  nick();

  const { data, loading, refetch } = useQuery(GET_PURCHASE_USER, {
    variables: {
      nickName: name,
    },
    pollInterval: 500,
  });

  useEffect(() => {
    refetch();
    if (Platform.OS == "android") {
      setOsImg(`http://10.90.101.24:3000/`);
    } else if (Platform.OS == "ios") {
      setOsImg(`http://10.90.101.24:3000/`);
    }
  }, [isFocused]);

  if (data) {
    console.log(data);
  }

  return (
    <ScrollView>
      {data ? (
        <Base>
          <Title>결제내역</Title>
          {data.getUserProduct.length ? (
            data.getUserProduct.map((data) => (
              <ProductContainer
                key={data.id}
                onPress={() =>
                  navigation.navigate("productInfo", {
                    id: data.user_product_id,
                    nick_name: data.nick_name,
                  })
                }
              >
                <Image
                  source={{
                    uri: `${osImg}${data.img_url}`,
                  }}
                  style={{
                    marginTop: "4%",
                    height: 150,
                    width: 160,
                  }}
                />
                <ProductContext>
                  <FlexContainer>
                    <Flex>
                      <ProductName>{data.product_name}</ProductName>
                    </Flex>
                    <Flex>
                      <Number>구매수량: {data.number}</Number>
                    </Flex>
                    <Flex>
                      <TotalPrice>총 가격: {data.total_price}</TotalPrice>
                    </Flex>
                  </FlexContainer>
                </ProductContext>
              </ProductContainer>
            ))
          ) : (
            <NoProduct>구매한 상품이 없습니다</NoProduct>
          )}
        </Base>
      ) : (
        console.log("로딩")
      )}
    </ScrollView>
  );
}

export default Cart;
