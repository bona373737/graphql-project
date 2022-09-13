import React, { useEffect } from "react";
import styled from "@emotion/styled/macro";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";
import { useHistory, useLocation } from "react-router-dom";
import Nav from "../components/Nav/Nav";
import { useQuery } from "@apollo/client";
import { GET_PURCHASE_USER } from "../graphql/query";

const Line = styled.hr`
  border: solid 0.5px;
  align: center;
  width: 100%;
  margin: 0;
`;
const Line2 = styled.hr`
  border: solid 0.2px #ebebeb;
  align: center;
  width: 100%;
`;

const Cart = () => {
  const location = useLocation();
  const history = useHistory();
  const { data } = useQuery(GET_PURCHASE_USER, {
    variables: {
      nickName: location.state.getAdmin[0].nick_name,
    },
  });

  useEffect(() => {
    // history.go(0);
  }, [data]);

  return (
    <>
      <Nav userData={location.state} />
      {data ? (
        <Grid width="1140px" margin="0 auto">
          <Grid is_flex padding="0 16px" margin="70px 0 25px">
            <Text size="24px" bold>
              결제내역
            </Text>
          </Grid>
          <Line />
          {data.getUserProduct.map((data) => (
            <div key={data.id}>
              <Grid padding="10px 0" center>
                <Grid
                  is_flex
                  _onClick={() => {
                    history.push({
                      pathname: `/productinfo/${data.user_product_id}`,
                      state: location.state,
                    });
                  }}
                >
                  <Image
                    src={process.env.REACT_APP_ROOT_URL + data.img_url}
                    width="15vw"
                    height="20vh"
                    margin="20px 10px"
                  ></Image>
                  상품 이름: {data.product_name}
                  <br />
                  구매 수량: {data.number}
                  <br />총 가격: {data.total_price}
                </Grid>
              </Grid>
              <Line2 />
            </div>
          ))}
        </Grid>
      ) : (
        <Text size="14px">결제하신 상품이 없습니다.</Text>
      )}
    </>
  );
};

export default Cart;
