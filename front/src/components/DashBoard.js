import { useQuery } from "@apollo/client";
import { useEffect } from "react";
//api
import {GET_getCompanyByParams} from "../graphql/query";
import {getAllDeviceByCompany} from "../graphql/query";
//components
import DeviceCard from "../elements/DeviceCard";
import LineChart from "./LineChart";
//style
import styled from "styled-components";
import { MdDashboard } from 'react-icons/md';


const DashBoardContainer=styled.div`
    color: var(--mainColor);
    display: flex;
    flex-direction: column;
    overflow: auto;
    
    .title{
        color: var(--mainColor);
        margin: 40px 0;
        font-size: 20px;
        font-weight: bold;
    }

    .content_wrap{
        box-sizing: border-box;
        min-width: 1200px;
        display: grid;
        grid-template-columns: repeat(2, minmax(800,1fr));
        grid-template-rows: auto;
        gap: 40px;

        
        .chart_wrap{
            /* background-color: teal; */
            grid-column: 1/3;
            grid-row: 1/2;
        }

        .company_wrap{
            /* background-color: blue; */
            grid-column: 1/2;
            grid-row: 2/3;

            .total_info_wrap{
                display: flex;
                justify-content: space-between;
                .device_total_card{
                    /* width: 300px; */
                    height: 100px;
                    background-color: var(--skyblue);
                }
                .company_total_card{
                    /* width: 300px; */
                    height: 100px;
                    background-color: var(--skyblue);
                }
            }

            .company_list_wrap{

            }
        }

        .device_wrap{
            /* background-color: tomato; */
            grid-column: 2/3;
            grid-row: 2/3;

        }
    }


`;

const DashBoard =()=>{
    const {loading, error, data} = useQuery(getAllDeviceByCompany)
    const {data:comapnyData} = useQuery(GET_getCompanyByParams,{
        variables:{company_name:"",business_number:""}});

    return(        
        <DashBoardContainer>
            {/* <h1 className="title"><MdDashboard/> ITOMS 운영현황 </h1> */}
            <h1 className="title">ITOMS 운영현황</h1>
            <div className="content_wrap">

            <section className="chart_wrap">
                <LineChart></LineChart>
            </section>
            <section className="company_wrap">
                <div className="total_info_wrap">
                    <div className="device_total_card">
                        운영장비총계
                    </div>
                    <div className="company_total_card">
                        관리기업총계
                    </div>
                </div>
                <div className="company_list_wrap">
                    기업별 운영장비총계 목록
                </div>
            </section>
            <section className="device_wrap">
                    장비목록
            </section>
            </div>

            {/* 
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
            } */}
        </DashBoardContainer>
    )
};
export default DashBoard;