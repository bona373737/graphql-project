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
        padding: 2px 8px;
        border-radius: 8px;
        color: var(--fontblack);
        border: 1px solid var(--gray);
        background-color: white;
        .btn_text_wrap{
            display: flex;
            justify-content: center;
            align-items: center;

            .dot{
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color: #3DCB91;
                margin-right: 4px;
            }
        }
        
        &.btn_invalid{
            color: var(--gray);
            .btn_text_wrap{
            display: flex;
            align-items: center;
            .dot{
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: var(--gray);
                margin-right: 3px;
                }
            }
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
                    <div className="btn_text_wrap"><div className="dot"></div>{availability===true? "Active":"Inactive"}</div>
                    </button>
                </td>
            </MemberListContainer> 
    )
}
export default MemberTr;