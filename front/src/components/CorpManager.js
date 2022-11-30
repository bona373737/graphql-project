import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const CorpManager=()=>{
    const [role, setRole] = useState("");

    const {loading,data,error} = useQuery(GET_ALLMEMBERBYROLE,{
        variables:{role:3}
    })

    return(
        <>
            <p>CorpManager_기업관리자 계정 관리</p>
            <p>{JSON.stringify(data)}</p>
        </>

    )  

}
export default CorpManager;