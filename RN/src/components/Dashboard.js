import React, {useEffect,useState} from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import {View,Text, ScrollView, TouchableOpacity} from "react-native"
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useLazyQuery,useQuery } from "@apollo/client";
import {GET_getCompanyByParams} from "../graphql/query";
import * as SecureStore from "expo-secure-store";



const styles = StyleSheet.create({
    dashboardContainer:{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30, 
    },
    addCorpBtn:{
        paddingHorizontal:20,
        paddingVertical:8,
        marginVertical:5,
        backgroundColor:"#FFFFFF",
        display:'flex',
        alignItems:'center',
    },
    cardContainer:{
        backgroundColor:"#FFFFFF",
        borderRadius:4,
        marginVertical:4,
    }
});


const Dashboard =()=>{
    const navigation = useNavigation();
    const [loginMemberData,setLoginMemberData] = useState();
    const [getCompany, {loading, error, data}] = useLazyQuery(GET_getCompanyByParams);

    const checkToken=async()=>{
        const data = await SecureStore.getItemAsync("loginToken");
        // console.log(data)
    }

    // const getLoginMemberData=async()=>{
    //     const data = await SecureStore.getItemAsync("loginUser");
    //     setLoginMemberData(JSON.parse(data));
    // }

    useEffect(()=>{
        const params={
            company_name:"",
            business_number:""
        }
        // console.log(params)
        // checkToken();

        getCompany({
            fetchPolicy:'no-cache',
            variables:{params:params},
            // fetchPolicy:"no-cache",
            onCompleted:(data)=>{
                // console.log("complete")
                // console.log(data)},
            },
            onError:(error)=>{
                console.log("대쉬보드.. 에러...")
                console.log({...error});
                // console.log(error.networkError.result.errors)
            }
        })
    },[]);


    return(
        data?.getCompanyByParams &&
        <View style={styles.dashboardContainer}>
        <TouchableOpacity style={styles.addCorpBtn} onPress={()=>{navigation.navigate("AddCompany")}}>
            <Text>기업추가 +</Text>
        </TouchableOpacity>
        <ScrollView>
            { data.getCompanyByParams.map((item,index)=>{ 
                return(
                    <TouchableOpacity key={index} style={styles.cardContainer} onPress={()=>{navigation.navigate("DeviceManager")}}>
                    <Card.Title 
                    title={item.company_name}
                    subtitle={`장비총계 : ${item.device_total}`}
                    left={(props) => <Avatar.Icon {...props} icon="folder" />}
                    // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
                    />
                </TouchableOpacity>
            )})}
        </ScrollView>
        </View>
    )
}
export default Dashboard;