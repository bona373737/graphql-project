import * as SecureStore from "expo-secure-store";

const checkUser=async()=>{
    try {
        const data = await SecureStore.getItemAsync("loginUser");
        const dataObj = JSON.parse(data)
        // console.log(dataObj)
        return dataObj 
    } catch (error) {
        console.log("에러")
        console.log(error)
    }
}

export default checkUser;