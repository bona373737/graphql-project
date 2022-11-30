import { useQuery } from "@apollo/client";
import { GET_ALLDEVICE } from "../graphql/query";
import DeviceCard from "../elements/DeviceCard";

const DeviceManager=()=>{
    const {loading,data,error} = useQuery(GET_ALLDEVICE)
    return(
        <>
            <p>DeviceManager_장비 관리</p>
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
        </>
        
    )

}
export default DeviceManager;