import {View,Text, StyleSheet} from "react-native"
import styled from "@emotion/native";
import { Card, Title, Paragraph } from 'react-native-paper';
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { useLazyQuery } from "@apollo/client";
import {GET_getMemberByParams} from "../graphql/query";

const styles = StyleSheet.create({
    UserManagerContainer:{
        flex: 1,
    },
    addMemberBtn:{
        paddingHorizontal:20,
        paddingVertical:8,
        marginVertical:5,
        backgroundColor:"#FFFFFF",
        alignItems:'center',
    },
    memberCard:{
        marginVertical:5,
        paddingVertical:5,
    },
    title:{
        paddingVertical:8,
    },  
    memberDesc:{
        flexDirection:"column"
    },
    noUserMsg:{
        
    },
});

const MemberManager =()=>{
    const [loginMemberData, setLoginMemberData] = useState();

    const [getUser, {data}] = useLazyQuery(GET_getMemberByParams)

    const getLoginMemberData=async()=>{
        try {
            let data = await SecureStore.getItemAsync("loginUser");
            if(data){
                data = JSON.parse(data);
                console.log(data);
                return data;
            }
        } catch (error) {
            console.log(error);
            throw error            
        }
    }

    useEffect(()=>{
        getLoginMemberData().then((data)=>{
            setLoginMemberData(data)

            console.log(data.role_no);
          
        })

        //사이트관리자가 접속한 경우 기업관리자 전체 조회

        // getUser({
        //     variables:{params:{company_no:null,member_no:null}},
        //     onCompleted:((data)=>{
        //         console.log(data);
        //     }),
        //     onError:((error)=>{
        //         console.log(error);
        //     console.log(error.networkError.result.errors)

        //     })
        // })
        
        //기업관리자가 접속한 경우 해당기업의 사용자 전체조회
        // getUser({
        //     variables:{params:{company_no:loginMemberData.company_no}},
        //     onCompleted:((data)=>{
        //         console.log(data);
        //     }),
        //     onError:((error)=>{
        //         console.log(error);
        //     })
        // })
    },[])


    return(
        <View style={styles.UserManagerContainer}>
                <TouchableOpacity style={styles.addMemberBtn} onPress={()=>{navigation.navigate("MemberManager")}}>
                    {
                      role === 1 ? (
                          <Text>기업관리자 추가</Text>
                          ):(
                          <Text>사용자 추가</Text>
                          )
                    }
                </TouchableOpacity>
            
            <ScrollView>
            {data?.getAllDeviceByParams.length>0 ?(
                data.getAllDeviceByParams.map((item,index)=>{
                    return(
                        <Card key={index} style={styles.memberCard}>
                            <Card.Content>
                            <Title style={styles.title}>{item.device_name}</Title>
                            <Paragraph >
                                <View style={styles.memberDesc}>
                                <Text>deviceNo : {item.device_no}</Text>
                                <Text>os:{item.os}</Text>
                                </View>
                            </Paragraph>
                    </Card.Content>
                    </Card>
                    )
                })
            ):(
                <Text style={styles.noDeviceMsg}>등록된 계정이 없습니다.</Text> 
            )
            }
            </ScrollView>
        </View>
    )

}
export default MemberManager;