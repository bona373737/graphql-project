import React from "react";
import IconEvilIcons from "react-native-vector-icons/EvilIcons";
import * as SecureStore from "expo-secure-store";
import {View,Text, StyleSheet} from "react-native"
import styled from "@emotion/native";
import { useEffect } from "react";
import { useState } from "react";

const styles = StyleSheet.create({
    LoginMemberContainer:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center'
    },
    Icon:{
        justifyContent:'center',
        alignItems:'center',
        fontSize:200,
    }

});


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
        <View style={styles.LoginMemberContainer}>
            {loginMemberData &&
            <>
                <IconEvilIcons style={styles.Icon} name="user"></IconEvilIcons>
                <Text>아이디 : {loginMemberData?.id}</Text>
                <Text>이름 : {loginMemberData?.name}</Text>
                {loginMemberData?.company_no?.company_name ?(
                    <Text>기업명 : {loginMemberData?.company_no?.company_name}</Text>
                ):(
                    ""
                )
                }
            </>
            }
        </View>
    )
}
export default LoginMember;