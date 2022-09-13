import React from "react";
import styled from "@emotion/styled/macro";
import Text from "../elements/Text";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import { useMutation, useQuery } from "@apollo/client";
import { DELETE_PRODUCT, GET_MALL_PRODUCT } from "../graphql/query";
import { useHistory } from "react-router-dom";

const Base = styled.div`
  display: inline-block;
  position: relative;
`;

const ListName2 = styled.p`
  font-weight: bold;
  font-size: 16px;
  color: #4e4e4e;
  margin: 3px 0 0 0;
  height: 20px;
  box-sizing: border-box;
  overflow: hidden;
  white-space: nowrap;
  width: 274px;
`;

const Profit = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  color: #a1a1a1;
  font-size: 13px;
`;

const DeleteButton = styled.button`
  background-color: #ffcc66;
  border: 1px solid #ffcc66;
  border-radius: 10px;
  position: absolute;
  padding: 10px;
  font-weight: bold;
  top: 380px;
  right: 20px;
  :hover {
    background-color: white;
  }
`;

//메인화면에서 상품 정보를 전달받아 제품 정보를 렌더링
const MallProduct = ({ userData }) => {
  const history = useHistory();
  const { data } = useQuery(GET_MALL_PRODUCT, {
    variables: {
      nickName: "인포플라",
    },
  });

  const deletePro = (data) => {
    console.log("data", data.id);
    deleteProduct({ variables: { adminProductDeleteId: data.id } });
    window.location.reload();
  };
  const [deleteProduct, deleteResult] = useMutation(DELETE_PRODUCT);

  if (deleteResult.data) {
    console.log(deleteResult.data);
  } else if (deleteResult.loading) {
    console.log(deleteResult.loading);
  } else {
    console.log(deleteResult.error);
  }

  return (
    <>
      {data
        ? data.getMallProduct.map((data) => (
            <Base key={data.id}>
              <Grid
                width="300px"
                height="420px"
                margin="20px 5px 50px 50px"
                bg="#f9fafa"
                _onClick={() => {
                  history.push({
                    pathname: `/productinfo/${data.id}`,
                    state: userData,
                  });
                }}
              >
                <Image
                  src={process.env.REACT_APP_ROOT_URL + data.img_url}
                  width="100%"
                  height="300px"
                />
                <Grid height="97px" padding="0 5%">
                  <div
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      width: "272px",
                      cursor: "pointer",
                    }}
                  >
                    <Text color="#A1A1A1" margin="14px 0px 0px" size="13px">
                      {data.mall_name}
                    </Text>
                    <ListName2>{data.product_name}</ListName2>
                    <Profit>총 수익: {data.profit}</Profit>
                  </div>
                  <Grid margin="14px 0 0 0">
                    <Text margin="0" size="1.25em" bold>
                      {data.price}
                      <span style={{ fontSize: "0.6em" }}>원</span>
                    </Text>
                  </Grid>
                </Grid>
              </Grid>
              <DeleteButton onClick={() => deletePro(data)}>삭제</DeleteButton>
            </Base>
          ))
        : console.log("로딩")}
    </>
  );
};

export default MallProduct;
