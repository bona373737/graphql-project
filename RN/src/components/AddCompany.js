import * as React from 'react';
import {View} from "react-native"
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import {M_createCompany} from "../graphql/query";
import {GET_getCompanyByParams} from "../graphql/query";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    AddCompanyContainer:{
        display:'flex',
        flex:1,
        justifyContent:'center',
        paddingHorizontal:30,

    },
    InputStyle:{
        marginVertical:30,
    }
})


const AddCompany =()=>{
    const navigate = useNavigation();

    const [companyName, setCompanyName] = React.useState("");
    const [businessNum, setBusinessNum] = React.useState("");

    const [addCompany,{data,error}] = useMutation(M_createCompany)

    const handleAddCompany=()=>{  
      const params={
        companyName:companyName,
        businessNumber:businessNum
      }
      console.log(params)

      addCompany({
        variables:params,
        refetchQueries:[
          {query : GET_getCompanyByParams,
          variables:{ company_name:"",business_number:""}}
        ],
        onCompleted:(data)=>{
          alert(data.createCompany);
          navigate.navigate("Dashboard")
        },
        onError:(error)=>{
          console.log("에러에러에러에러")
          console.log({...error})
          console.log(error.networkError.result.errors);
        }
    })}

    return (
    <View style={styles.AddCompanyContainer}>
      <TextInput
        label="기업명"
        value={companyName}
        onChangeText={text => setCompanyName(text)}
        styles={styles.InputStyle}
        />
      <TextInput
        label="사업자번호"
        value={businessNum}
        onChangeText={text => setBusinessNum(text)}
        keyboardType="numeric"
        style={styles.InputStyle}
        />
        <Button mode="contained" onPress={handleAddCompany}>
            등록
        </Button>
    </View>
    );
  };
export default AddCompany;