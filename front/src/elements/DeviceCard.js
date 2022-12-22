import styled from "styled-components";


const DeviceCardContainer = styled.div`
    display: flex;
    
    .card_wrap{
        font-size: 14px;
        line-height: 18px;
        box-sizing: border-box;
        border-radius: 10px;
        padding: 10px;
        margin: 10px;
        width: 240px;
        height: 160px;
        background-color: white;
        color: var(--mainColor);
        box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
        :hover{
            margin-top: 6px;
            transition: all 0.5s ;
            box-shadow: rgba(17, 17, 26, 0.05) 2px 2px 2px, rgba(17, 17, 26, 0.1) 2px 2px 2px;
        }
        .device_name{
            margin: 10px 0;
            font-size: 18px;
            color: var(--mainColor);
        }
    }
`;

const DeviceCard =({device})=>{
    return(
        <DeviceCardContainer>
            {
                device && (
                    <div className="card_wrap" >
                        <h1 className="device_name">{device.device_name}</h1>
                        <h1>장비번호 : {device.device_no}</h1>
                        <h1>OS : {device.os}</h1>
                        <h1>담당자 : {device.member_no? device.member_no:"담당자 미정" }</h1>
                    </div>
                )
            }
        </DeviceCardContainer>
    )
}
export default DeviceCard;