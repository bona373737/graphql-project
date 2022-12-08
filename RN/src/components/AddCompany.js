import * as React from 'react';
import {View} from "react-native"
import { Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';

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

    const [companyName, setCompanyName] = React.useState("");
    const [businessNum, setBusinessNum] = React.useState("");

    return (
    <View style={styles.AddCompanyContainer}>
      <TextInput
        label="기업명"
        value={companyName}
        onChangeText={companyName => setBusinessNum(companyName)}
        styles={styles.InputStyle}
        />
      <TextInput
        label="사업자번호"
        value={businessNum}
        onChangeText={businessNum => setText(businessNum)}
        style={styles.InputStyle}
        />
        <Button mode="contained" onPress={() => console.log('Pressed')}>
            등록
        </Button>
    </View>
    );
  };
export default AddCompany;