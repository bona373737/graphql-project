import styled from "styled-components";
import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import MemberTr from "../elements/MemberTr";
import CreateMember from "./CreateMember";

const CorpManagerContainer=styled.div`

    .thead_tr{
        
    }
    

`;

const CorpManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const column = ['기업명','아이디','이름','계정생성일','계정유효상태']

    const {loading,data,error} = useQuery(GET_ALLMEMBERBYROLE,{
        variables:{role:2}
    })

    return(
        <CorpManagerContainer>
            <h1> [CorpManager_기업관리자 계정 관리] </h1>
            <button onClick={()=>{setModalOpen(true)}}>계정등록</button>
            {
                data?.getAllMemberByRole &&
                <table>
                    <thead>
                        <tr>
                            {
                                column.map((item,index)=>{
                                    return <th key={index}>{item}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {
                                data.getAllMemberByRole.map((item,index)=>{ 
                                    return <MemberTr key={index} memberData={item}></MemberTr>
                                })
                            }
                    </tbody>
                </table>
            }
            {
                modalOpen &&
                <CreateMember setModalOpen={setModalOpen}></CreateMember>
            }
        </CorpManagerContainer>
    )  

}
export default CorpManager;