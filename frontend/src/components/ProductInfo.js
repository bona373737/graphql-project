import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import Text from "../elements/Text";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import TextWrapper from "../elements/TextWrapper";
import Nav from "./Nav/Nav";
import { useMutation, useQuery } from "@apollo/client";
import { useHistory, useLocation } from "react-router-dom";
import { GET_PRODUCTINFO, PROFIT, PURCHASE } from "../graphql/query";
import { FaPlus, FaMinus } from "react-icons/fa";

const Line = styled.hr`
  border: solid 0.2px #ebebeb;
  align: center;
  width: 92%;
`;

const H = styled.span`
  color: #ff6f61;
  font-weight: 800;
`;

const FooterContainer = styled.div`
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 10%;
  border-top: 1px solid #eaeaea;
  box-shadow: 0 -2px 12px 0 rgb(0 0 0 / 5%);
  background-color: white;
`;

const FooterForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 17px;
`;

const NumberContainer = styled.div`
  display: flex;
  margin-left: 20%;
`;

const NumberText = styled.div`
  margin-top: 8px;
  margin-right: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const IncreaseButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

const Number = styled.div`
  margin-top: 9px;
`;

const DecreaseButton = styled.button`
  background-color: inherit;
  border: none;
  cursor: pointer;
`;

const AmountContainer = styled.div`
  display: flex;
  margin-right: 10%;
`;

const TotalAmount = styled.div`
  font-size: 2rem;
  margin-right: 20px;
`;

const PurchaseButton = styled.button`
  width: 100px;
  height: 44px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: #ffcc66;
  border: 1px solid #ffcc66;
  cursor: pointer;
  :hover {
    background-color: white;
    color: black;
  }
`;

const NonClickButton = styled.button`
  width: 100px;
  height: 44px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: gray;
  border: 1px solid #ffcc66;
  cursor: pointer;
  pointer-events: none;
  :hover {
    background-color: white;
    color: black;
  }
`;

function ProductInfo() {
  const history = useHistory();
  const location = useLocation();
  const [id, setId] = useState(0);
  const [number, setNumber] = useState(0);

  const onIncrease = () => {
    setNumber((prev) => prev + 1);
  };

  const onDecrease = () => {
    setNumber((prev) => prev - 1);
    if (number === 0) {
      setNumber(0);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!localStorage.getItem("login-token")) {
      return history.push("/login");
    }
    if (data) {
      history.push({
        pathname: "/cart",
        state: location.state,
      });
      window.location.reload();
    } else {
      alert("구매 불가능");
    }
  };

  useEffect(() => {
    setId(parseInt(window.location.href.split("/").slice(-1)[0]));
  }, []);

  const { data } = useQuery(GET_PRODUCTINFO, {
    variables: {
      productId: id,
    },
  });

  const [purchaseProduct, { purchase_data }] = useMutation(PURCHASE);

  const [profitProduct, { profit_data }] = useMutation(PROFIT);

  if (purchase_data) {
    console.log("purchase_data ", purchase_data);
  } else if (profit_data) {
    console.log("profit_data ", profit_data);
  } else if (data) {
    console.log(data.getBuyProduct[0].img_url);
  }

  return (
    <>
      {data ? (
        <>
          <Nav userData={location.state} />
          <Grid padding="60px 0 0 30px" max_width="1000px" margin="0 auto">
            <div style={{ alignItems: "flex-start", display: "flex" }}>
              <Image
                src={
                  process.env.REACT_APP_ROOT_URL + data.getBuyProduct[0].img_url
                }
                height="500px"
              />
              <Grid margin="0 0 0 30px;">
                <Grid is_flex>
                  <TextWrapper
                    prd_name={data.getBuyProduct[0].product_name}
                    prd_sum={data.getBuyProduct[0].mall_name}
                    originPrice={data.getBuyProduct[0].price}
                  />
                </Grid>
                <Line />
                <Grid is_flex padding="6px 16px">
                  <Grid width="auto">
                    <Text size="13px" margin="0" bold width="auto">
                      배송비
                    </Text>
                  </Grid>
                  <Grid width="82%" padding="0 0 0 15px">
                    <Text size="13px" bold margin="0">
                      <H>무료</H>
                    </Text>
                  </Grid>
                </Grid>
                <Line />
                <Grid is_flex padding="6px 16px">
                  <Grid width="auto">
                    <Text size="13px" margin="0" bold width="auto">
                      상품정보
                    </Text>
                    <Text size="30px" margin="10" width="auto" color="#999">
                      {data.getBuyProduct[0].detail}
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <FooterContainer>
            <FooterForm onSubmit={onSubmitHandler}>
              <NumberContainer>
                <NumberText>수량</NumberText>
                <IncreaseButton type="button" onClick={onIncrease}>
                  <FaPlus />
                </IncreaseButton>
                <Number>{number}</Number>
                <DecreaseButton type="button" onClick={onDecrease}>
                  <FaMinus />
                </DecreaseButton>
              </NumberContainer>
              <AmountContainer>
                <TotalAmount>
                  {data.getBuyProduct[0].price * number}원
                </TotalAmount>
                {number ? (
                  <PurchaseButton
                    onClick={async () => {
                      await purchaseProduct({
                        variables: {
                          userProductId: data.getBuyProduct[0].id,
                          nickName: location.state.getAdmin[0].nick_name,
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
                      });
                    }}
                  >
                    구매하기
                  </PurchaseButton>
                ) : (
                  <NonClickButton>구매하기</NonClickButton>
                )}
              </AmountContainer>
            </FooterForm>
          </FooterContainer>
        </>
      ) : (
        console.log("로딩")
      )}
    </>
  );
}

export default ProductInfo;
