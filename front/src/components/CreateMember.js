import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";

import {M_CREATEMEMBER} from '../graphql/query';
import {GET_getMemberByParams } from "../graphql/query";
import {GET_AllCompany} from '../graphql/query';
import {GET_AllRole} from '../graphql/query';
import { useEffect } from "react";

const CreateMemberContainer=styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 450px;
    margin: auto;
    background-color: var(--gray);

    .close_button{
        box-sizing: border-box;
        background-color: var(--gray);
        border: none;
        width: 100%;
        font-size: 20px;
        text-align: right;
        padding: 10px;
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;

        .input_wrap{
            margin: 14px 0;
            label{
                display: inline-block;
                text-align: center;
                width: 120px;
                span{
                    color:red;
                    margin-right: 5px;
                }
            }
            input{
                width: 300px;
                line-height: 30px;
                text-indent: 5px;
                border: none;
                :focus{
                    outline: none;
                }
            }
            select{
                width: 300px;
                height: 30px;
                border: none;
            }
        }
        button{ 
            background-color: black;
            color: white;
            width: 100px;
            height: 30px;
            border: none;
            margin :20px 0;
            :hover{
                background-color: white;
                color: black;
            } 
        }
    }
`;

const CreateMember=({setModalOpen})=>{
    const [loginMemberData, setLoginMemberData] = useState();
    const [role, setRole] = useState(); 
    const [companyNoSelected, setCompanyNoSelected] = useState();
    const [params, setParams] = useState();
    
    useEffect(()=>{
        const data= JSON.parse(localStorage.getItem("loginUser"));
        setLoginMemberData(data);
        setRole(data.role_no);

        const params={
            role_no:data.role_no+1,
        }

        if(data.role_no === 2){
            params['company_no'] = data.company_no.company_no;
        }
        setParams(params);
    },[])
    
    const {data:allCompany} = useQuery(GET_AllCompany)
    const {data:allRole} = useQuery(GET_AllRole)
    // const [getAllAdmin] = useLazyQuery(GET_ALLMEMBERBYROLE);
    //사이트관리자(1)는 기업관리자(2) 생성 / 기업관리자(2)는 사용자(3)생성
    const [createMember, {loading, data, error}]= useMutation(M_CREATEMEMBER,{
        fetchPolicy:'network-only',
        refetchQueries:[
            {query : GET_getMemberByParams,
            variables:{params:params}}
        ],
        onCompleted:(data)=>{
            alert(data.createMember)
        }
    });

    const onSubmit =async(e)=>{
        e.preventDefault();
        const current = e.target  
        const createMemberCorpNo = loginMemberData.role_no ===1? Number(companyNoSelected): loginMemberData.company_no.company_no;

        const params={
            role_no:role+1,
            company_no:createMemberCorpNo,
            name:current.name.value,
            id:current.id.value,
            password:current.password.value
        }
        // console.log(params)

        await createMember({variables:{
            role_no:role+1,
            company_no:createMemberCorpNo,
            name:current.name.value,
            id:current.id.value,
            password:current.password.value
        }})

        e.target.reset();
        setModalOpen(false)
    };

    return(
        <CreateMemberContainer>
                <button className="close_button" onClick={()=>{setModalOpen(false)}}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <form onSubmit={onSubmit}>
                    <h1>계정 등록</h1>
                    <div className="input_wrap">
                        <label htmlFor="role_no"><span>*</span>계정권한</label>
                        {
                            role &&
                            <input id="role_no" defaultValue={role ===1? "기업관리자":"사용자"} disabled></input>
                        }
                        {/* <select id="role_no" required>
                            {allRole&&
                                allRole.getAllRole.map((item,index)=>{
                                    return <option key={index} value={item.role_no}>{`${item.role_no}:${item.role_name}`}</option>
                                })
                            }
                            <option></option>
                        </select> */}
                    </div>
                    <div className="input_wrap">
                        { role && role === 1? (
                            <>
                            <label htmlFor="company_no"><span>*</span>기업</label>
                            <select id="company_no" onChange={(e)=>{setCompanyNoSelected(e.target.value)}}>
                                {allCompany?.getAllCompany &&
                                    allCompany.getAllCompany.map((item,index)=>{
                                        return <option key={index} value={item.company_no}>{`${item.company_no}:${item.company_name}`}</option>
                                    })
                                }
                            </select>
                            </>
                        ):(
                            //객체인데... empty확인이..이거아닌데 말이즤.......
                            loginMemberData &&
                            <>
                            <label htmlFor="company_no"><span>*</span>기업</label>
                            <input id="company_no" defaultValue={`${loginMemberData.company_no.company_no}:${loginMemberData.company_no.company_name}`} disabled></input>
                            </>
                        )}
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="name"><span>*</span>성명</label>
                        <input id="name" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="id"><span>*</span>아이디</label>
                        <input id="id" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="password"><span>*</span>비밀번호</label>
                        <input id="password" type="password" required></input>
                    </div>
                    <button>등록</button>
                </form>
        </CreateMemberContainer>
    )
};
export default CreateMember;