import {View,Text, StyleSheet, ScrollView, TouchableOpacity} from "react-native"
import { Card, Title, Paragraph } from 'react-native-paper';
import styled from "@emotion/native";

import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import {GET_GetAllDeviceByParams} from "../graphql/query";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    DeviceManagerContainer:{
        flex: 1,
    },
    addCorpBtn:{
        paddingHorizontal:20,
        paddingVertical:8,
        marginVertical:5,
        backgroundColor:"#FFFFFF",
        alignItems:'center',
    },
    devcieCard:{
        marginVertical:5,
    },
    cardContent:{
        flexDirection:'column'
    },
    title:{
        marginBottom:40,
    },  
    deviceDesc:{
        flexDirection:"column"
    },
    noDeviceMsg:{
        
    },
});

const DeviceManager =({route})=>{
    const navigation = useNavigation();
    const [role, setRole] = useState();
    const [memberNo,setMemberNo] = useState();
    let companyNo;
    if(route.params){
        companyNo = route.params;
        // console.log(companyNo)
    }

    const getLoginMemberData=async()=>{
        try {
            let data = await SecureStore.getItemAsync("loginUser");
            if(data){
                data = JSON.parse(data);
                return data;
            }
        } catch (error) {
            throw error            
        }
    }

    const [getDevice, {loading, error, data}] = useLazyQuery(GET_GetAllDeviceByParams,{
        fetchPolicy:'network-only',
        onCompleted:(data)=>{
            // console.log(data)
        },
        onError:(error)=>{
            console.log({...error})
            // console.log(error.networkError.result.errors)
        }
    })
    
  

    useEffect(()=>{
        getLoginMemberData().then((data)=>{
            setRole(data.role_no);
            setMemberNo(Number(data.member_no));
            // console.log(data.member_no);
            // console.log(data.role_no)

            switch (data.role_no) {
                case 1:
                    //사이트관리자가 접속한 경우 앞의 stack스크린에서 선택한 기업의 장비목록조회
                    console.log("사이트관리자!")
                    // console.log(companyNo.companyNo)
                    // console.log(role)
                    getDevice({
                        variables:{params:{company_no:Number(companyNo.companyNo),member_no:null}},
                        fetchPolicy:'network-only',
                        onCompleted:(data)=>{
                            // console.log(data)
                        },
                        onError:(error)=>{
                            console.log({...error})
                            // console.log(error.networkError.result.errors)
                        }})
                    break;
                case 2:
                       // 기업관리자가 접속한 경우 로그인된 계정에 해당하는 기업의 장비목록조회
                        console.log("기업관리자!")
                        getDevice({
                            variables:{params:{company_no:role,member_no:null}},
                            fetchPolicy:'network-only',
                            onCompleted:(data)=>{
                                // console.log(data)
                            },
                            onError:(error)=>{
                                console.log({...error})
                                // console.log(error.networkError.result.errors)
                            }})
                    break;
                case 3:
                         // 사용자가 접속한 경우 로그인된 해당사용자의 장비목록조회
                        console.log("사용자!")
                        getDevice({
                            variables:{params:{company_no:null,member_no:memberNo}},
                            fetchPolicy:'network-only',
                            onCompleted:(data)=>{
                                // console.log(data)
                            },
                            onError:(error)=>{
                                console.log({...error})
                                console.log(error.networkError.result.errors)
                            }})
                    break;
                default:
                    break;
            }

            // if(companyNo && data.role_no===1){
            //     //사이트관리자가 접속한 경우 앞의 stack스크린에서 선택한 기업의 장비목록조회
            //     console.log("사이트관리자!")
            //     // console.log(companyNo.companyNo)
            //     // console.log(role)
            //     getDevice({
            //         variables:{params:{company_no:Number(companyNo.companyNo),member_no:null}},
            //         fetchPolicy:'network-only',
            //         onCompleted:(data)=>{
            //             // console.log(data)
            //         },
            //         onError:(error)=>{
            //             console.log({...error})
            //             // console.log(error.networkError.result.errors)
            //         }})
            // }else if(data.role_no ===2){
            //     // 기업관리자가 접속한 경우 로그인된 계정에 해당하는 기업의 장비목록조회
            //     console.log("기업관리자!")
            //     getDevice({
            //         variables:{params:{company_no:role,member_no:null}},
            //         fetchPolicy:'network-only',
            //         onCompleted:(data)=>{
            //             // console.log(data)
            //         },
            //         onError:(error)=>{
            //             console.log({...error})
            //             // console.log(error.networkError.result.errors)
            //         }})
    
            // }else if(data.role_no ===3){
            //     // 사용자가 접속한 경우 로그인된 해당사용자의 장비목록조회
            //     console.log("사용자!")
            //     getDevice({
            //         variables:{params:{company_no:null,member_no:memberNo}},
            //         fetchPolicy:'network-only',
            //         onCompleted:(data)=>{
            //             // console.log(data)
            //         },
            //         onError:(error)=>{
            //             console.log({...error})
            //             console.log(error.networkError.result.errors)
            //         }})
            // }
        });
    },[])


    return(
        <View style={styles.DeviceManagerContainer}>
            {role === 1 || role === 2 ? (
                <TouchableOpacity style={styles.addCorpBtn} onPress={()=>{navigation.navigate("AddDevice")}}>
                    <Text>장비추가</Text>
                </TouchableOpacity>
            ):(
                ""
            )
            }
            <ScrollView>
            {data?.getAllDeviceByParams.length>0 ?(
                data.getAllDeviceByParams.map((item,index)=>{
                    return(
                        <Card key={index} style={styles.devcieCard}>
                            <Card.Content style={styles.cardContent}>
                            <Title style={styles.title}>{item.device_name}</Title>
                            <Paragraph >
                                <View style={styles.deviceDesc}>
                                <Text>장비번호 : {item.device_no}</Text>
                                <Text>운영체제: {item.os}</Text>
                                <Text>담당자: {item.member_no}</Text>
                                </View>
                            </Paragraph>
                    </Card.Content>
                    </Card>
                    )
                })
            ):(
               <Text style={styles.noDeviceMsg}>등록된 장비가 없습니다.</Text> 
            )
            }
            </ScrollView>
        </View>
    )

}
export default DeviceManager;