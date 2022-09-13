import React, { useEffect, useState } from "react"; //
import styled from "@emotion/styled/macro";
import { useHistory } from "react-router-dom";
import { CREACTUSER } from "../graphql/query";
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

const RadioContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const RadioInput = styled.input`
  margin-left: 20px;
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

function Register() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [address, setAddress] = useState("");
  const [select, setSelect] = useState("0");

  const onIdHandler = (e) => {
    setId(e.target.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.target.value);
  };

  const onNameHandler = (e) => {
    setName(e.target.value);
  };

  const onNickNameHandler = (e) => {
    setNickName(e.target.value);
  };

  const onAddressHandler = (e) => {
    setAddress(e.target.value);
  };

  const onSelectHandler = (e) => {
    setSelect(e.target.value);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    await createUser();
  };

  const [createUser, { data, loading, error }] = useMutation(CREACTUSER, {
    variables: {
      createUserId: id,
      password: password,
      name: name,
      nickName: nickName,
      address: address,
      admin: parseInt(select),
    },
  });

  useEffect(() => {
    if (data) {
      console.log("data", data);
      history.push("/login");
    }
    if (loading) {
      console.log("loading", loading);
    }
    if (error) {
      console.log("error", error);
      alert("같은 아이디 또는 닉네임이 존재합니다.");
    }
  }, [data, loading, error, history]);

  return (
    <Base>
      <Title>INFOFLA</Title>
      <Container onSubmit={onSubmitHandler}>
        <TextContainer>
          <TextInput
            placeholder="아이디를 입력하세요"
            type="text"
            value={id}
            onChange={onIdHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="비밀번호를 입력하세요"
            type="password"
            value={password}
            onChange={onPasswordHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="이름(기업명)을 입력하세요"
            type="text"
            value={name}
            onChange={onNameHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="닉네임(기업명)을 입력하세요"
            type="text"
            value={nickName}
            onChange={onNickNameHandler}
          />
        </TextContainer>
        <TextContainer>
          <TextInput
            placeholder="주소를 입력하세요"
            type="text"
            value={address}
            onChange={onAddressHandler}
          />
        </TextContainer>
        <RadioContainer>
          <RadioInput
            type="radio"
            id="0"
            name="goal"
            value="0"
            checked={select === "0"}
            onChange={onSelectHandler}
          />
          <label htmlFor="goal">사용자</label>
          <RadioInput
            type="radio"
            id="1"
            name="goal"
            value="1"
            checked={select === "1"}
            onChange={onSelectHandler}
          />
          <label htmlFor="goal">쇼핑몰</label>
        </RadioContainer>
        <RegisterButton>회원가입</RegisterButton>
      </Container>
    </Base>
  );
}

export default Register;
