import React, { useEffect, useState } from "react";
import styled from "@emotion/styled/macro";
import { useHistory, useLocation } from "react-router-dom";
import { USER_INFO } from "../graphql/query";
import { useMutation } from "@apollo/client";

const Base = styled.section`
  text-align: center;
  height: 100vh;
  width: 100vw;
  background-color: #f7f7f7;
`;

const Title = styled.div`
  padding-top: 17%;
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

function UserInfo() {
  const location = useLocation();
  const history = useHistory();
  const [address, setAddress] = useState("");

  const onAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await updateUser();
  };

  const [updateUser, { data, loading, error }] = useMutation(USER_INFO, {
    variables: {
      updateUserId: location.state.getAdmin[0].id,
      address: address,
    },
  });

  useEffect(() => {
    if (data) {
      history.push({
        pathname: "/",
        state: location.state.getAdmin[0].id,
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
            placeholder="수정할 주소를 입력하세요"
            type="text"
            value={address}
            onChange={onAddressHandler}
          />
        </TextContainer>
        <RegisterButton>정보 수정</RegisterButton>
      </Container>
    </Base>
  );
}

export default UserInfo;
