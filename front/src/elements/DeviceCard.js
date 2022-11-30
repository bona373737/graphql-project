import styled from "styled-components";


const DeviceCardContainer = styled.div`


`;

const DeviceCard =({item})=>{


    return(
        <DeviceCardContainer>
            <p>{JSON.stringify(item)}</p>
        </DeviceCardContainer>
    )
}
export default DeviceCard;