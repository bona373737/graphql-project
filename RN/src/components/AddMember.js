import * as React from 'react';
import {View} from "react-native"
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import {M_createMember} from "../graphql/query";
import {GET_getMemberByParams} from "../graphql/query";
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    AddCompanyContainer:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:30,

    },
    InputStyle:{
        marginVertical:6,
    },
    InputStyle2:{
      marginBottom:6

    }
})


const AddMember =()=>{
    const navigate = useNavigation();

    const [role, setRole] = React.useState("");
    const [companyNo, setCompanyNo] = React.useState("");
    const [name,setName] = React.useState();
    const [id,setId] = React.useState();
    const [password,setPassword] = React.useState();


    const [AddMember,{data,error}] = useMutation(M_createMember,{
          fetchPolicy:'network-only',
          refetchQueries:[
          {query : GET_getMemberByParams,
          variables:{params:{role_no:2}}}
        ],
    })

    const handleAddMember=()=>{  
      const params={
        role_no:parseInt(role),
        company_no:parseInt(companyNo),
        name:name,
        id:id,
        password:password
      }
      console.log(params)

      AddMember({
        variables:params,
    
        onCompleted:(data)=>{
          console.log(data);
          navigate.navigate("MemberManager")
        },
        onError:(error)=>{
          console.log({...error})
          // console.log(error.networkError.result.errors);
        }
    })
  }

    return (
    <View style={styles.AddCompanyContainer}>
      <TextInput
        label="권한"
        value={role}
        onChangeText={text => setRole(text)}
        keyboardType="numeric"
        styles={styles.InputStyle2}
        />
      <TextInput
        label="기업번호"
        value={companyNo}
        onChangeText={text => setCompanyNo(text)}
        keyboardType="numeric"
        styles={styles.InputStyle2}
        />
      <TextInput
        label="이름"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.InputStyle}
        />
      <TextInput
        label="아이디"
        value={id}
        onChangeText={text => setId(text)}
        style={styles.InputStyle}
        />
      <TextInput
        label="비밀번호"
        value={password}
        onChangeText={text => setPassword(text)}
        style={styles.InputStyle}
        />
        <Button mode="contained" onPress={handleAddMember}>
            등록
        </Button>
    </View>
    );
  };
export default AddMember;