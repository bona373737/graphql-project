import { useQuery } from "@apollo/client";
import styled from "styled-components";
import {getAllDeviceByCompany} from "../graphql/query";
import DeviceCard from "../elements/DeviceCard";

const DashBoardContainer=styled.div`
    .title{
        margin: 30px 20px;
        font-size: 20px;
    }
    .company_wrap{
        margin: 20px;
        padding: 10px;
        border: 1px solid var(--gray);
        box-shadow: 5px 3px 3px var(--gray)
    }
    .device_wrap{
        display: flex;
        flex-wrap: wrap;
        .no_device_msg{
            margin: 10px;
        }
    }
`;

const DashBoard =()=>{
    const {loading, error, data} = useQuery(getAllDeviceByCompany)

    return(        
        <DashBoardContainer>
            <h1 className="title"> [ITOMS 운영현황] </h1>
            {data && 
            <>
                {
                    data.getAllDeviceByCompany.map((item,index)=>{
                        return(
                            <div className="company_wrap" key={index}>
                            <h1>{item.company_name}</h1>
                            <div className="device_wrap">
                                {
                                    item.company_no.length !== 0? (
                                        item.company_no.map((v,i)=>{
                                            return <DeviceCard device={v} key={i}></DeviceCard>
                                        })
                                        ):(
                                            <h1 className="no_device_msg">등록된 장비가 없습니다.</h1>
                                            
                                        )
                                }
                            </div>
                            </div>
                        )
                    })
                }
            </>
            }
        </DashBoardContainer>
    )
};
export default DashBoard;