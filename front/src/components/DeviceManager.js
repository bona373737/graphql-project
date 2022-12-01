import { useQuery } from "@apollo/client";
import { GET_ALLDEVICE } from "../graphql/query";
import DeviceCard from "../elements/DeviceCard";
import CreateMember from "./CreateMember";
import { useState } from "react";

const DeviceManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const {loading,data,error} = useQuery(GET_ALLDEVICE)
    return(
        <>
            <p>DeviceManager_장비 관리</p>
            <button onClick={()=>{setModalOpen(true)}}>장비등록</button>
            {
                data? (
                    data.getAllDevice.map((item,index)=>{
                        return(
                            <DeviceCard item={item} key={index}/>
                        )
                    })
                ):(
                    <p>등록된 장치가 없습니다.</p>
                )
            }

            {
                modalOpen &&
                <CreateMember setModalOpen={setModalOpen}></CreateMember>
            }
        </>
        
    )

}
export default DeviceManager;