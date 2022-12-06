import styled from "styled-components";


const DeviceCardContainer = styled.div`
    display: flex;
    
    .card_wrap{
        box-sizing: border-box;
        padding: 10px;
        margin: 10px;
        width: 200px;
        height: 120px;
        background-color: var(--gray);
    }
`;

const DeviceCard =({device})=>{
    return(
        <DeviceCardContainer>
            {
                device && (
                    <div className="card_wrap" >
                        <h1>장비번호 : {device.device_no}</h1>
                        <h1>장비명 : {device.device_name}</h1>
                        <h1>장비명 : {device.os}</h1>
                        <h1>담당자 : {device.member_no? device.member_no:"담당자 미정" }</h1>
                    </div>
                )
            }
        </DeviceCardContainer>
    )
}
export default DeviceCard;