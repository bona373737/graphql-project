import { Text, View } from "react-native";
import React, { Component } from "react";
import styled from "@emotion/native";
import { Link } from "@react-navigation/native";

const Base = styled.View`
  width: 100%;
  height: 10%;
  margin-top: 2%;
  background-color: white;
  border: 1px solid;
  border-top-color: #fff;
  border-bottom-color: #efefef;
`;

const Logo = styled(Link)`
  font-size: 35px;
  font-weight: bold;
  text-align: center;
  margin: 5%;
  height: 60%;
  z-index: 9999;
`;

export class Nav extends Component {
  render() {
    return (
      <Base>
        <Logo to="/Home">INFOFLA</Logo>
      </Base>
    );
  }
}

export default Nav;
