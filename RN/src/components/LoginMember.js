import React from "react";
import * as SecureStore from "expo-secure-store";
import {View,Text} from "react-native"
import styled from "@emotion/native";
import { useEffect } from "react";
import { useState } from "react";

const Base = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const LoginMember =()=>{
    const [ loginMemberData, setLoginMemberData] = useState();

    const getLoginMemberData=async()=>{
        const data = await SecureStore.getItemAsync("loginUser");
        setLoginMemberData(JSON.parse(data));
    }

    useEffect(()=>{
        getLoginMemberData();
    },[])

    return(
        <Base>
            <Text>아이디 : {loginMemberData?.id}</Text>
            <Text>이름 : {loginMemberData?.name}</Text>
            <Text>기업명 : {loginMemberData?.company_no?.company_name}</Text>
        </Base>
    )
}
export default LoginMember;