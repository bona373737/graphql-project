import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { GET_PRODUCTINFO, PROFIT, PURCHASE } from "../graphql/query";
import { ScrollView, Image, View, Text, Alert } from "react-native";
import styled from "@emotion/native";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const Base = styled.View``;

const Container = styled.View`
  margin: 20px;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
  color: #222;
`;

const MallName = styled.Text`
  color: #afafaf;
  margin-left: 5px;
`;

const Price = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
  color: #5f5f5f;
`;

const Detail = styled.Text`
  margin: 10px 0 20% 5px;
  font-size: 20px;
  color: #3d3d3d;
`;

const Footer = styled.View`
  background-color: #fafafa;
  position: absolute;
  height: 10%;
  width: 100%;
  bottom: 0;
`;

const FooterNumberContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 8% 0 10%;
`;

const NumberWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const NumberText = styled.Text`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
`;

const IncreaseButton = styled.TouchableOpacity`
  padding-bottom: 3px;
`;

const Number = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin: 0 5px;
`;

const DecreaseButton = styled.TouchableOpacity`
  padding-bottom: 3px;
`;

const PurchaseWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Profit = styled.Text`
  font-size: 20px;
  margin-right: 10px;
`;

const PurchaseButton = styled.Button``;

function ProductInfo({ route }) {
  const navigation = useNavigation();
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("");

  const onIncrease = () => {
    setNumber((prev) => prev + 1);
  };

  const onDecrease = () => {
    setNumber((prev) => prev - 1);
    if (number === 0) {
      setNumber(0);
    }
  };

  const goAlert = async (text) =>
    Alert.alert(
      "구매하시겠습니까?",
      text,
      [
        {
          text: "네",
          onPress: async () => {
            await purchaseProduct({
              variables: {
                userProductId: data.getBuyProduct[0].id,
                nickName: name,
                productName: data.getBuyProduct[0].product_name,
                number: number,
                totalPrice: data.getBuyProduct[0].price * number,
                imgUrl: data.getBuyProduct[0].img_url,
              },
            });
            await profitProduct({
              variables: {
                profit:
                  data.getBuyProduct[0].profit +
                  data.getBuyProduct[0].price * number,
                productProfitId: data.getBuyProduct[0].id,
              },
            }),
              navigation.navigate("shopping");
          },
        },
        {
          text: "아니요",
          opPress: () => {
            console.log("안삼");
          },
          style: "cancel",
        },
      ],
      { cancelable: false }
    );

  const onSubmitHandler = async (e) => {
    if (!(await SecureStore.getItemAsync("login-token"))) {
      return navigation.navigate("login");
    }
    if (data) {
      goAlert(`${data.getBuyProduct[0].product_name} ${number}개`);
    } else {
      alert("구매 불가능");
    }
  };

  const { data } = useQuery(GET_PRODUCTINFO, {
    variables: {
      productId: route.params.id,
    },
  });

  const nick = async () => {
    setName(await SecureStore.getItemAsync("nick_name"));
  };
  nick();

  console.log(name);

  const [purchaseProduct, { purchase_data }] = useMutation(PURCHASE);

  const [profitProduct, { profit_data }] = useMutation(PROFIT);

  return (
    <>
      {data ? (
        <>
          <ScrollView>
            <Base>
              <Image
                source={{
                  uri: `http://10.90.101.24:3000/${data.getBuyProduct[0].img_url}`,
                }}
                style={{
                  height: 350,
                  width: "100%",
                }}
              />
              <Container>
                <Title>{data.getBuyProduct[0].product_name}</Title>
                <MallName>{data.getBuyProduct[0].mall_name}</MallName>
                <Price>{data.getBuyProduct[0].price}원</Price>
                <Detail>{data.getBuyProduct[0].detail}</Detail>
                <Detail>{data.getBuyProduct[0].detail}</Detail>
                <Detail>{data.getBuyProduct[0].detail}</Detail>
                <Detail>{data.getBuyProduct[0].detail}</Detail>
              </Container>
            </Base>
          </ScrollView>
          <Footer>
            <FooterNumberContainer>
              <NumberWrapper>
                <NumberText>수량</NumberText>
                <IncreaseButton onPress={onIncrease}>
                  <Text
                    style={{
                      color: "#aaa",
                      fontSize: 35,
                    }}
                  >
                    +
                  </Text>
                </IncreaseButton>
                <Number>{number}</Number>
                <DecreaseButton onPress={onDecrease}>
                  <Text
                    style={{
                      color: "#aaa",
                      fontSize: 40,
                    }}
                  >
                    -
                  </Text>
                </DecreaseButton>
              </NumberWrapper>
              <PurchaseWrapper>
                <Profit>{data.getBuyProduct[0].price * number}원</Profit>
                {number ? (
                  <PurchaseButton
                    title="구매하기"
                    color="#7DD421"
                    onPress={async () => {
                      await onSubmitHandler();
                    }}
                  />
                ) : (
                  <PurchaseButton title="구매하기" color="#dfdfdf" />
                )}
              </PurchaseWrapper>
            </FooterNumberContainer>
          </Footer>
        </>
      ) : (
        console.log("로딩")
      )}
    </>
  );
}

export default ProductInfo;
