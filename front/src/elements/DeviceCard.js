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
                device? (
                    device.map((item,index)=>{
                        return(
                            <div className="card_wrap" key={index}>
                                <h1>장비번호 : {item.device_no}</h1>
                                <h1>장비명 : {item.device_name}</h1>

                            </div>
                        )
                    })
                ):(
                    <h1>등록된 장비가 없습니다</h1>
                )
            }
            {/* <p>{JSON.stringify(device)}</p> */}
        </DeviceCardContainer>
    )
}
export default DeviceCard;