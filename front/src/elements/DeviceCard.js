import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_ALLDEVICE } from "../graphql/query";

const DeviceCardContainer = styled.div`


`;

const DeviceCard =()=>{
    const {loading,data,error} = useQuery(GET_ALLDEVICE)

    return(
        <DeviceCardContainer>
            {
                data? (
                    <p>{JSON.stringify(data)}</p>
                ):(
                    <p>등록된 장치가 없습니다.</p>
                )
            }
        </DeviceCardContainer>
    )
}
export default DeviceCard;