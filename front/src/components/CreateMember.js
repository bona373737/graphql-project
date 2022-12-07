import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import {M_CREATEMEMBER} from '../graphql/query';
import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import {GET_AllCompany} from '../graphql/query';
import {GET_AllRole} from '../graphql/query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


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

    const [companyNoSelected, setCompanyNoSelected] = useState();
    const [getAllAdmin] = useLazyQuery(GET_ALLMEMBERBYROLE);
    const [createMember, {loading, data, error}]= useMutation(M_CREATEMEMBER,{
        refetchQueries:[
            {query : GET_ALLMEMBERBYROLE,
            variables:{role:2}}
        ]
    });
    const {data:allCompany} = useQuery(GET_AllCompany)
    const {data:allRole} = useQuery(GET_AllRole)

    const onSubmit =async(e)=>{
        e.preventDefault();
        console.log(e.target)

        const current = e.target        
        await createMember({variables:{
            role_no:2,
            company_no:Number(companyNoSelected),
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
                {/* <p>{JSON.stringify(allCompany.getAllCompany)}</p> */}
                <form onSubmit={onSubmit}>
                    <h1>계정 등록</h1>
                    <div className="input_wrap">
                        <label htmlFor="role_no"><span>*</span>권한</label>
                        <input id="role_no" defaultValue="기업관리자" disabled></input>
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
                        <label htmlFor="company_no"><span>*</span>기업번호</label>
                        <select id="company_no" onChange={(e)=>{setCompanyNoSelected(e.target.value)}}>
                            {allCompany?.getAllCompany &&
                                allCompany.getAllCompany.map((item,index)=>{
                                    return <option key={index} value={item.company_no}>{`${item.company_no}:${item.company_name}`}</option>
                                })
                            }
                        </select>
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