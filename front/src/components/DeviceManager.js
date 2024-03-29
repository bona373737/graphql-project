import { useEffect, useState } from "react";

//api
import { useLazyQuery, useQuery } from "@apollo/client";
import {GET_GetAllDeviceByParams} from "../graphql/query";

//components
import DeviceCard from "../elements/DeviceCard";
import CreateDevice from "./CreateDevice";

//style
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as React from 'react';



const DeviceManagerContainer = styled.div`
  height: 100%;
  width: 100%;
  /* position: relative; */

.title{
    color: var(--mainColor);
    margin: 40px 0;
    margin-top: 15px;
    font-size: 20px;
    font-weight: bold;
 
}
.device_wrap{
    /* margin-bottom: 5px; */
    /* margin: 20px 0; */
    display: flex;
    flex-wrap: wrap;

    .no_device_msg{
        margin: 10px;

    }
}
.dimmed{
    /* display: none; */
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0%;
    width: 100%;
    height: 100%;
    background-color: var(--mainColor);
    opacity: 0.5;
    border-radius: 5px;
}
`;

const AddDeviceCard = styled.div`
        box-sizing: border-box;
        border-radius: 10px;
        padding: 10px;
        margin-right: 10px;
        margin-bottom: 5px;
        width: 240px;
        height: 160px;
        box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;

        /* background-color: white; */
        cursor: pointer;
        color: var(--mainColor);

        font-size: 26px;
        line-height: 150px;
        text-align: center;
`;

const DeviceManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [getDevice,{loading,data,error}] = useLazyQuery(GET_GetAllDeviceByParams);
    const [role, setRole] = useState();

    useEffect(()=>{
        //localStorage에 저장된 로그인한 사용자 정보....수정필요 
        const loginUser =  JSON.parse(localStorage.getItem("loginUser"));
        setRole(loginUser.role_no);
    
        const params={};

        if(loginUser.role_no===2){
            params.company_no = loginUser.company_no.company_no;
        }else if(loginUser.role_no===3){
            params.member_no = loginUser.member_no;
        }

        //기업관리자가 로그인했을때-->company_no기준으로 device 전체조회
        //사용자가 로그인했을때--> member_no기분으로 device 전체조회  
        getDevice({variables:{params:params}})
    },[])


    const handelModalOpen=()=>{
        setModalOpen(true);
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
        return(
        <DeviceManagerContainer>
            <h1 className="title"> 장비 관리</h1>
            <div className="device_wrap">
                {role && role === 2? (
                    <AddDeviceCard onClick={handelModalOpen} >
                    <FontAwesomeIcon icon={faPlus}/>
                    </AddDeviceCard>
                ):(
                    ""
                )}
            {
                data?.getAllDeviceByParams?.length>0? (
                    data.getAllDeviceByParams.map((item,index)=>{
                        return <DeviceCard device={item} getDevice={getDevice} key={index}/>
                    })
                    ):(
                        <p className="no_device_msg">등록된 장치가 없습니다.</p>
                        )
                    }

            {
                modalOpen && 
                <>
                <CreateDevice className="create_device_modal" setModalOpen={setModalOpen}></CreateDevice>
                <div className="dimmed"></div>
                </>   
            }
            </div>
    
        </DeviceManagerContainer>
        
    )

}
export default DeviceManager;