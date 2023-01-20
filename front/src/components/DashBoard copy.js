import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import {getAllDeviceByCompany} from "../graphql/query";
//style
import styled from "styled-components";
import { MdDashboard } from 'react-icons/md';

//components
import DeviceCard from "../elements/DeviceCard";
import LineChart from "./LineChart";


const DashBoardContainer=styled.div`
    color: var(--mainColor);
    display: flex;
    flex-direction: column;

    overflow: auto;
    
    .title{
        text-align: center;
        color: var(--mainColor);
        margin: 40px 0;
        font-size: 20px;
        font-weight: bold;
    }
    .company_wrap{
        border-radius: 10px;
        padding: 20px;
        background: linear-gradient( 150deg, var(--mainColor), 3%, var(--subColor), 10%, #00ff0000 );
        box-shadow: inset 0 0.2px rgba(23, 32, 63, .2);
        .company_name{
            font-weight: bold;
        }
    }
    .device_wrap{
        display: flex;
        overflow-y: auto;
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
            <h1 className="title"><MdDashboard/> ITOMS 운영현황 </h1>

            <LineChart></LineChart>

            {data && 
            <>
                {
                    data.getAllDeviceByCompany.map((item,index)=>{
                        return(
                            <div className="company_wrap" key={index}>
                            <h1 className="company_name">{item.company_name}</h1>
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