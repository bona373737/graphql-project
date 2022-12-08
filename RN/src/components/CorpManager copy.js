import React,{useState, useEffect} from "react";
import * as SecureStore from "expo-secure-store";
import {View,Text} from "react-native"
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { DataTable,Searchbar  } from 'react-native-paper';

import {useLazyQuery,useQuery} from "@apollo/client";
import {GET_getAllMemberByRole, GET_getAllMemberByRoleAndCorp} from "../graphql/query";
import { ScrollView } from "react-native-gesture-handler";


const styles = StyleSheet.create({
    CorpManagerContainer:{
        // flex: 1,
        paddingTop:50,
        paddingHorizontal: 20,
        paddingVertical: 30, 
    },
    searchBoxWrap:{
        display:"flex",

    },
    tableTr:{

    }
});

const CorpManager =()=>{

    const [loginMemberData,setLoginMemberData] = useState();
    const columns = ['기업명','아이디','이름']

    // const {data:ya} = useQuery(GET_getAllMemberByRole);

    const [getAllAdmin,{loading,data:AllData,error}] = useLazyQuery(GET_getAllMemberByRole);
    const [getSearchQuery,{data:searchData}] = useLazyQuery(GET_getAllMemberByRoleAndCorp);
    let [renderData, setRenderData] = useState([]);

    const getLoginMemberData=async()=>{
        const data = await SecureStore.getItemAsync("loginUser");
        setLoginMemberData(JSON.parse(data));
    }

    useEffect(()=>{
    
        getLoginMemberData().then(()=>{
            const param = {
                role:loginMemberData?.role_no+1
            };
            getAllAdmin({
                variables:param,
                onCompleted:(_,data)=>{
                    setRenderData(_.getAllMemberByRole)
                    console.log(_.getAllMemberByRole)
                },
                onError:(e)=>{
                    console.log(e);
                }
            })
        }
        );
    },[])

    //검색어
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);
    //검색버튼 클릭시 role_no가 2번인 계정 중 기업이름으로 계정조회
    const handleSearch=(e)=>{
        // e.preventDefault();
        // const searchKeword = e.target.search_input.value;

        // if(searchKeword){
        //     getSearchQuery({variables:{role:2,companyName:searchKeword},
        //         onCompleted:(_,data) => {
        //             setRenderData(_.getAllMemberByRoleAndCorp)
        //         }
        //     })
        // }
    };



    return(
        <View styles={styles.CorpManagerContainer}> 
        <View>
            <Searchbar
                placeholder="기업명 검색"
                onChangeText={onChangeSearch}
                value={searchQuery}
                />
        </View>

        <DataTable>
            <DataTable.Header>
                {columns.map((column,index)=>{
                    return <DataTable.Title numeric style={styles.tableTr} key={index}>{column}</DataTable.Title>
                })
            }
            </DataTable.Header>
            <DataTable.Row>
                <DataTable.Cell numeric>1</DataTable.Cell>
                <DataTable.Cell numeric>2</DataTable.Cell>
                <DataTable.Cell numeric>3</DataTable.Cell>
            </DataTable.Row>
        </DataTable>
        </View>
    )

}
export default CorpManager;