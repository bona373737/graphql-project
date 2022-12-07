import React from "react";
import {View,Text} from "react-native"
import styled from "@emotion/native";

const Base = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const DeviceManager =()=>{

    return(
        <Base>
            <Text>DeviceManager</Text>
        </Base>
    )

}
export default DeviceManager;