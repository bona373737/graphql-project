import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { useHistory, useLocation } from "react-router-dom";
import { CREATE_PRODUCT } from "../graphql/query";
import { useMutation } from "@apollo/client";

const Base = styled.section`
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const Title = styled.div`
  padding-top: 7%;
  padding-bottom: 2%;
  font-size: 50px;
  font-weight: bold;
  color: #444;
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  width: 300px;
  height: 40px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const TextInput = styled.input`
  width: 90%;
  height: 80%;
  padding-top: 2%;
  background-color: #f7f7f7;
  border: none;
`;

const DetailContainer = styled.div`
  width: 300px;
  height: 200px;
  margin-bottom: 10px;
  border: 1px solid gray;
  border-radius: 10px;
`;

const DetailInput = styled.textarea`
  width: 90%;
  height: 95%;
  padding-top: 2%;
  background-color: #f7f7f7;
  border: none;
`;

const RegisterButton = styled.button`
  width: 302px;
  height: 44px;
  font-size: 20px;
  font-weight: bold;
  border-radius: 10px;
  color: white;
  background-color: #ffcc66;
  border: none;
  cursor: pointer;
  :hover {
    background-color: green;
  }
`;

const RegisterText = styled.div`
  font-size: 13px;
  color: #666666;
  margin: -10px 0 10px 0;
`;

function ProductRegistion() {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState("");
  const [pdName, setPdName] = useState("");
  const [price, setPrice] = useState(0);
  const [detail, setDetail] = useState("");

  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onPdNameHandler = (e) => {
    setPdName(e.target.value);
  };

  const onPriceHandler = (e) => {
    setPrice(e.target.value);
  };

  const onDetailHandler = (e) => {
    setDetail(e.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await createProduct();
  };

  const [createProduct, { data, loading, error }] = useMutation(
    CREATE_PRODUCT,
    {
      variables: {
        mallName: name,
        productName: pdName,
        price: parseInt(price),
        detail: detail,
      },
    }
  );

  useEffect(() => {
    if (data) {
      console.log("data", data);
      history.push({
        pathname: "/productimageregistion",
        state: location.state,
      });
    }
    if (loading) {
      console.log("loading", loading);
    }
    if (error) {
      console.log("error", error);
    }
  }, [data, loading, error, history, location.state]);

  return (
    <Base>
      <Title>INFOFLA</Title>
      <Container onSubmit={onSubmitHandler}>
        <TextContainer>
          <TextInput
            placeholder="쇼핑몰(닉네임)을 입력하세요"
            type="text"
            value={name}
            onChange={onNameHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="상품 이름을 입력하세요"
            type="text"
            value={pdName}
            onChange={onPdNameHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="상품의 가격을 입력하세요"
            type="text"
            value={price}
            onChange={onPriceHandler}
          />
        </TextContainer>
        <RegisterText>ex) 15000</RegisterText>
        <DetailContainer>
          <DetailInput
            placeholder="상품의 상세 내용을 적어주세요"
            type="text"
            value={detail}
            onChange={onDetailHandler}
          />
        </DetailContainer>
        <RegisterButton>상품 등록하기 (1/2)</RegisterButton>
      </Container>
    </Base>
  );
}

export default ProductRegistion;
