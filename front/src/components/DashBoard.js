import { useQuery } from "@apollo/client";
import styled from "styled-components";
import {getAllDeviceByCompany} from "../graphql/query";
import DeviceCard from "../elements/DeviceCard";

const DashBoardContainer=styled.div`
    .company_wrap{
        margin: 20px;
        padding: 10px;
        border: 1px solid var(--gray);
        box-shadow: 5px 3px 3px var(--gray)

    }


`;

const DashBoard =()=>{
    const {loading, error, data} = useQuery(getAllDeviceByCompany)

    return(        
        <DashBoardContainer>
            <h1> [ITOMS 운영현황] </h1>
            {data&& 
            <>
                {
                    data.getAllDeviceByCompany.map((item,index)=>{
                        return(

                            <div className="company_wrap" key={index}>
                            <h1>{item.company_name}</h1>
                            <div className="device_wrap">
                                <DeviceCard device={item.company_no}></DeviceCard>
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