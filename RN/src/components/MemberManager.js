import {View,Text, StyleSheet, TouchableOpacity,ScrollView} from "react-native"
import styled from "@emotion/native";
import { Card, Title, Paragraph } from 'react-native-paper';
import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

import { useLazyQuery } from "@apollo/client";
import {GET_getMemberByParams} from "../graphql/query";
import { useNavigation } from "@react-navigation/native";

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
        // paddingVertical:5,
    },
    title:{
        // paddingVertical:8,
        paddingBottom:12,
    },  
    memberDesc:{
        flexDirection:"column",
    },
    noUserMsg:{
        
    },
});

const MemberManager =()=>{
    const navigation =useNavigation();
    const [loginMemberData, setLoginMemberData] = useState();
    const [role, setRole] = useState();

    const [getUser, {data}] = useLazyQuery(GET_getMemberByParams,{
        fetchPolicy:'network-only'
    })

    const getLoginMemberData=async()=>{
        try {
            let data = await SecureStore.getItemAsync("loginUser");
            if(data){
                data = JSON.parse(data);
                console.log("loginUser데이터~~~~!!")
                // console.log(data);
                return data;
            }
        } catch (error) {
            console.log(error);
            // console.log(error.networkError.result.errors)
            throw error            
        }
    }

    useEffect(()=>{
        getLoginMemberData().then((data)=>{
            setLoginMemberData(data);
            setRole(data.role_no);

            switch (data.role_no) {
                case 1:
                    getUser({
                    variables:{params:{role_no:data.role_no+1}},
                    onCompleted:((data)=>{
                        console.log(data);
                    }),
                    onError:((error)=>{
                        console.log(error);
                        // console.log(error.networkError.result.errors)
                    })
                })
                    break;
                case 2:
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
                    
                    break;
            
                default:
                    break;
            }
          
        })
    },[])


    return(
        <View style={styles.UserManagerContainer}>
                <TouchableOpacity style={styles.addMemberBtn} onPress={()=>{navigation.navigate("AddMember")}}>
                    {
                      role === 1 ? (
                          <Text>기업관리자 추가</Text>
                          ):(
                          <Text>사용자 추가</Text>
                          )
                    }
                </TouchableOpacity>
            
            <ScrollView>
            {data?.getMemberByParams?.length>0 ?(
                data.getMemberByParams.map((item,index)=>{
                    return(
                        <Card key={index} style={styles.memberCard}>
                            <Card.Content>
                            <Title style={styles.title}>{item.name}</Title>
                            <Paragraph >
                                <View style={styles.memberDesc}>
                                <Text>아이디:{item.id}</Text>
                                <Text>소속기업:{item.company_no.company_name}</Text>
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