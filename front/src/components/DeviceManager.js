import { useQuery } from "@apollo/client";
import { GET_ALLDEVICE } from "../graphql/query";
import DeviceCard from "../elements/DeviceCard";
import CreateDevice from "./CreateDevice";
import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const DeviceManagerContainer = styled.div`
  height: 100%;
  width: 100%;
  position: relative;

.title{
    margin: 30px 20px;
    font-size: 20px;
}

.device_wrap{
    margin: 20px 10px;
    display: flex;
    flex-wrap: wrap;
}

.dimmed{
    /* display: none; */
    position: fixed;
    z-index: 1;
    top: 0;
    left: 20%;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
}
`;

const AddDeviceCard = styled.div`
        box-sizing: border-box;
        padding: 10px;
        margin: 10px;
        width: 200px;
        height: 120px;
        background-color: var(--gray);
        cursor: pointer;

        font-size: 26px;
        line-height: 100px;
        text-align: center;
`;


const DeviceManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const {loading,data,error} = useQuery(GET_ALLDEVICE);

    const handelModalOpen=()=>{
        setModalOpen(true);

    }


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
        return(
        <DeviceManagerContainer>
            <h1 className="title"> [ 장비 관리(기업관리자) ]</h1>
            <div className="device_wrap">
                <AddDeviceCard onClick={handelModalOpen} >
                  <FontAwesomeIcon icon={faPlus} />
                </AddDeviceCard>
            {
                data? (
                    data.getAllDevice.map((item,index)=>{
                        return <DeviceCard device={item} key={index}/>
                    })
                    ):(
                        <p>등록된 장치가 없습니다.</p>
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