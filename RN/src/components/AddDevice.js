import * as React from 'react';
import {View} from "react-native"
import { Button, TextInput, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useMutation, useQuery } from '@apollo/client';
import {M_createDevice} from "../graphql/query";
import {GET_GetAllDeviceByParams} from "../graphql/query";
import { useNavigation } from '@react-navigation/native';
import ModalDropdown from 'react-native-modal-dropdown';

const styles = StyleSheet.create({
    AddCompanyContainer:{
        // flexDirection:'column',
        flex:1,
        justifyContent:'center',
        paddingHorizontal:30,

    },
    InputStyle:{
        marginVertical:30,
    },
})


const AddDevice =()=>{
    const navigate = useNavigation();

    const [companyNo, setCompanyNo] = React.useState("");
    const [deviceName, setDeviceName] = React.useState("");
    const [selectedMemberNo, setSelectedMemberNo] = React.useState("");
    const [selectedOs, setSelectedOs] = React.useState("");
    const osItems=['Linux','window32','window64'];

    const [AddDevice,{data,error}] = useMutation(M_createDevice,{
          fetchPolicy:'network-only',
          refetchQueries:[
          {query : GET_GetAllDeviceByParams,
          variables:{params:{}}}
        ],
    })

    //로그인된 계정의 전체 사용자 조회
    // const {data:users} = useQuery()


    const handleAddCompany=()=>{  
      const params={
        company_no:companyNo,
        member_no:selectedMemberNo,
        os:selectedOs,
        device_name:deviceName
      }
      console.log(params)

      AddDevice({
        variables:params,
    
        onCompleted:(data)=>{
          console.log(data.createDevice);
          navigate.navigate("DeviceManager")
        },
        onError:(error)=>{
          console.log("에러에러에러에러")
          console.log({...error})
          // console.log(error.networkError.result.errors);
        }
    })}

    return (
    <View style={styles.AddCompanyContainer}>
      <TextInput
        label="기업번호"
        value={companyNo}
        onChangeText={text => setCompanyNo(text)}
        styles={styles.InputStyle}
        />
        <TextInput
          label="장비명"
          value={deviceName}
          onChangeText={text => setDeviceName(text)}
          styles={styles.InputStyle}
          />
        <TextInput
          label="운영체제"
          value=""
          onChangeText={text => setOs(text)}
          styles={styles.InputStyle}
          />
        {/* <ModalDropdown 
          textStyle={styles.dropdownStyle} 
          dropdownStyle={styles.dropdownStyle} 
          options={osItems}
        /> */}
        <TextInput
          label="사용자지정"
          value={selectedMemberNo}
          onChangeText={text => setSelectedMemberNo(text)}
          styles={styles.InputStyle}
          />
        <Button mode="contained" onPress={handleAddCompany}>
            등록
        </Button>
    </View>
    );
  };
export default AddDevice;