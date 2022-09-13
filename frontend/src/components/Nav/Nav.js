import React from "react";
import styled from "@emotion/styled/macro";
import { Link, useHistory } from "react-router-dom";

const Wrapper = styled.div``;

const Base = styled.div`
  z-index: 9999;
  position: fixed;
  top: 0;
  width: 100%;
  height: 7vh;
  border-bottom: 1px solid #eaeaea;
  box-shadow: 0 -2px 12px 0 rgb(0 0 0 / 5%);
  background-color: white;
  color: #333333;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  line-height: 7vh;
  margin: 0 4%;
`;

const Logo = styled(Link)`
  font-size: 25px;
  font-weight: bold;
  text-decoration-line: none;
  color: #333333;
`;

const Info = styled.div`
  display: flex;
`;

const NickName = styled.div`
  color: gray;
`;

const SmallText = styled.div`
  font-size: 10px;
  margin-right: 10px;
`;

const Text = styled(Link)`
  margin: 0 10px;
  text-decoration-line: none;
  color: #333333;
`;

const LogoutButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0 10px;
  text-decoration-line: none;
  color: #333333;
  font-size: 16px;
  cursor: pointer;
`;

const Interval = styled.div`
  color: #dddddd;
  font-size: 14px;
  cursor: default;
`;

function Nav({ userData }) {
  // console.log(userData);
  const history = useHistory();

  const LogoutHandler = () => {
    localStorage.removeItem("login-token");
    history.push("/");
  };

  return (
    <Wrapper>
      <Base>
        <Container>
          {userData ? (
            <Logo
              to={{
                pathname: "/",
                state: userData.getAdmin[0].id,
              }}
            >
              INFOFLA
            </Logo>
          ) : (
            <Logo
              to={{
                pathname: "/",
                state: userData,
              }}
            >
              INFOFLA
            </Logo>
          )}
          {localStorage.getItem("login-token") && userData ? (
            <Info>
              <NickName>{userData.getAdmin[0].nick_name}</NickName>
              <SmallText>님</SmallText>
              <Interval>|</Interval>
              {userData.getAdmin[0].admin === 0 ? (
                <Text
                  to={{
                    pathname: "/cart",
                    state: userData,
                  }}
                >
                  결제내역
                </Text>
              ) : (
                <Text
                  to={{
                    pathname: "/productregistion",
                    state: userData,
                  }}
                >
                  상품등록
                </Text>
              )}
              <Interval>|</Interval>
              <Text
                to={{
                  pathname: "/userinfo",
                  state: userData,
                }}
              >
                회원정보수정
              </Text>
              <Interval>|</Interval>
              <LogoutButton onClick={LogoutHandler}>로그아웃</LogoutButton>
            </Info>
          ) : (
            <Info>
              <Text to="/login">로그인</Text>
              <Interval>|</Interval>
              <Text to="/register">회원가입</Text>
            </Info>
          )}
        </Container>
      </Base>
    </Wrapper>
  );
}

export default Nav;
