import styled from "styled-components";
import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { makeVarTest } from "../pages/LoginPage";
import MemberList from "../elements/MemberListItem";
import CreateMember from "./CreateMember";

const CorpManagerContainer=styled.div`
    

`;

const CorpManager=()=>{
    const makeVar = makeVarTest();
    const role_no = makeVar? makeVar[0].role_no : "";
    
    // const [role, setRole] = useState("");
    const {loading,data,error} = useQuery(GET_ALLMEMBERBYROLE,{
        variables:{role:2}
    })



    return(
        data &&
        <CorpManagerContainer>
            <p> [CorpManager_기업관리자 계정 관리] </p>

            <table>
                <thead>
                    <tr>
                        {
                            Object.keys(data.getAllMemberByRole[0]).map((item,index)=>{
                                return <th key={index}>{item}</th> 
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    data && data.getAllMemberByRole.map((item,index)=>{ 
                        return <MemberList key={index} state={item}></MemberList>
                    })}
                </tbody>
            </table>

            {/* 계정등록 모달창 */}
            <CreateMember></CreateMember>
        </CorpManagerContainer>


    )  

}
export default CorpManager;