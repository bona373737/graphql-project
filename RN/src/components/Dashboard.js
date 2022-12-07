import * as React from 'react';
import { Avatar, Card, IconButton } from 'react-native-paper';
import {View,Text, ScrollView, TouchableOpacity} from "react-native"
import styled from "@emotion/native";
import { StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";


const styles = StyleSheet.create({
    dashboardContainer:{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 30, 
    },
    title:{fontSize:20},
    addCorpBtn:{
        width:60,
        height:60,
        backgroundColor:"#FFFFFF",
        borderRadius:50,
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

    return(
        <View style={styles.dashboardContainer}>
        <Text style={styles.title}>ITOMS 운영현황</Text>
        <TouchableOpacity style={styles.addCorpBtn}>
            <Text>기업추가 +</Text>
        </TouchableOpacity>
        <ScrollView>
        
        <TouchableOpacity style={styles.cardContainer} onPress={()=>{navigation.navigate("")}}>
            <Card.Title 
                title="기업명"
                subtitle="장비총계 :"
                left={(props) => <Avatar.Icon {...props} icon="folder" />}
                // right={(props) => <IconButton {...props} icon="more-vert" onPress={() => {}} />}
                />
        </TouchableOpacity>

        </ScrollView>
        </View>
    )
}
export default Dashboard;