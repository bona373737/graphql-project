import * as React from "react";
import { ScrollView } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { GET_SHOWPRODUCT } from "../graphql/query";
import styled from "@emotion/native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const Container = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ClickCard = styled.TouchableOpacity`
  width: 47%;
  margin-left: 2%;
  margin-bottom: 2%;
`;

const Title = styled.Text`
  margin-top: 10px;
  font-size: 25px;
  font-weight: bold;
`;

const Price = styled.Text`
  margin-top: 10px;
  font-size: 20px;
`;

const Product = ({ nick_name }) => {
  const isFocused = useIsFocused();
  const { data, refetch } = useQuery(GET_SHOWPRODUCT);
  const [osImg, setOsImg] = React.useState("");
  const navigation = useNavigation();

  React.useEffect(() => {
    refetch();
    if (Platform.OS == "android") {
      setOsImg(`http://10.90.101.24:3000/`);
    } else if (Platform.OS == "ios") {
      setOsImg(`http://10.90.101.24:3000/`);
    }
  }, [isFocused]);

  return (
    <ScrollView>
      <Container>
        {data
          ? data.getShowProduct.map((data) => (
              <ClickCard
                key={data.id}
                onPress={() =>
                  navigation.navigate("productInfo", {
                    id: data.id,
                    nick_name: nick_name,
                  })
                }
              >
                <Card>
                  <Card.Cover
                    source={{
                      uri: `${osImg}${data.img_url}`,
                    }}
                  />
                  <Card.Content>
                    <Title>{data.product_name}</Title>
                    <Paragraph style={{ color: "#A1A1A1", margin: "1%" }}>
                      {data.mall_name}
                    </Paragraph>
                    <Price>{data.price}원</Price>
                  </Card.Content>
                </Card>
              </ClickCard>
            ))
          : console.log("로딩")}
      </Container>
    </ScrollView>
  );
};

export default Product;
