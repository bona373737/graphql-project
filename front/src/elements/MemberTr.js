import { useMutation } from "@apollo/client";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {M_updateMember} from "../graphql/query";

const MemberListContainer=styled.tr`
    &.tr_invalid{
        color: var(--gray);
    }
    td{
        vertical-align: bottom;
    }
    button{
        width: 80px;
        &.btn_invalid{
            color: var(--gray);
            border: 1px solid var(--gray);
            background-color: #ffffff;
        }
    }
`;

const MemberTr=({memberData})=>{
    const [availability,setAvailability] = useState();

    const [changeAvailability] = useMutation(M_updateMember)

    useEffect(()=>{
        setAvailability(memberData?.isavailable);
    },[])
    
    const handleAvailability =()=>{
        setAvailability(!availability);
        changeAvailability({variables:{memberNo:memberData.member_no,isavailable:!availability}})
    }

    return(
        memberData &&
            <MemberListContainer className={availability !== true? "tr_invalid":""}>
                <td>{memberData.member_no}</td>
                <td>{memberData.company_no.company_name}</td>
                <td>{memberData.id}</td>
                <td>{memberData.name}</td>
                <td>{memberData.reg_date}</td>
                <td><button onClick={handleAvailability} className={availability!==true? "btn_invalid":""}>
                    {availability===true? "valid":"invalid"}</button>
                </td>
            </MemberListContainer> 
    )
}
export default MemberTr;