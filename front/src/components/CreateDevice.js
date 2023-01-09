import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import {M_CREATEMEMBER} from '../graphql/query';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {M_CREATEDEVICE} from "../graphql/query";
import {GET_getAllMemberByRoleAndCorpNo} from "../graphql/query";
import {GET_GetAllDeviceByParams} from "../graphql/query";
import { useEffect, useState } from "react";

const CreateDeviceContainer=styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    height: 600px;
    margin: auto;
    background-color: var(--subColor);
    border-radius: 20px;

    .modal_header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--mainColor);
        border-radius: 15px 15px 0 0 ;
        .close_button{
            box-sizing: border-box;
            background-color: var(--mainColor);
            border: none;
            font-size: 20px;
            font-weight: bold;
            text-align: right;
            padding: 20px;
            border-radius: 20px;
        }
        h1{
            width: 100%;
            margin-left: 40px;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }
    }

    form{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin:30px 40px 0 0;
        font-size: 24px;
        .input_wrap{
            margin: 20px 0;
            label{
                color: var(--mainColor);
                font-weight: bold;
                display: inline-block;
                width: 140px;
            }
            input{
                width: 300px;
                height: 38px;
                text-indent: 5px;
                border: none;
                border-bottom: 0.3px solid rgba(23, 32, 63, .1);
                background-color: var(--subColor);
                font-size: 20px;
                :focus{
                    outline: none;
                }
                :disabled{
                    color: var(--mainColor);
                }
            }
            select{
                font-size: 20px;
                background-color: var(--subColor);
                width: 300px;
                height: 38px;
                text-indent: 5px;
                border: none;
                border-bottom: 0.3px solid rgba(23, 32, 63, .1);
                line-height: 50px;
                :focus{
                    outline: none;
                }
                li{
                    height: 20px;
                    padding: 15px 0;
                }
            }
            span{
                color: var(--pointColor);
                margin: 0 5px;
            }
        }
        button{
            background-color: var(--mainColor);
            margin-top: 40px;
            width: 120px;
            height: 40px;
            font-size: 20px;
            border-radius: 20px;
        }
    }
`;

//기업사용자만 장비등록가능
const CreateDevice=({setModalOpen})=>{

    const [companyNo, setCompanyNo] = useState();
    const [selectedUserNo, setSelectedUserNo] = useState();
    const [companyName, setCompanyName] = useState();
    const osArr = ["Linux","Window32","Window64"];
    const [createNewDevice, {loading, data, errror}] = useMutation(M_CREATEDEVICE,{
        refetchQueries:[
            {query :GET_GetAllDeviceByParams,
            variables:{params:{company_no:companyNo}}
            }
        ]
    });
    const [getDevice] = useLazyQuery(GET_GetAllDeviceByParams);


    //담당사용자 셀렉트 옵션 --- 특정기업의 사용자목록조회(role_no:3, company_no)
    const [getUsers,{data:userData}] = useLazyQuery(GET_getAllMemberByRoleAndCorpNo);

    useEffect(()=>{
        const loginUser = JSON.parse(localStorage.getItem("loginUser"));
        setCompanyName(loginUser?.company_no.company_name);
        setCompanyNo(Number(loginUser?.company_no.company_no));
        // const companyNo = loginUser?.company_no.company_no;
        getUsers({variables:{
            role:3,
            companyNo:loginUser.company_no.company_no
        }})
    },[])

    const onSubmit =async(e)=>{
        e.preventDefault();

        const params={};
        params.company_no=parseInt(e.target.company_no.value);
        params.device_name=e.target.device_name.value;
        params.os=e.target.os.value;
        params.member_no=selectedUserNo? parseInt(selectedUserNo):null;

        console.log(params)

        createNewDevice({
            variables:{     
                company_no:params.company_no,
                device_name:params.device_name,
                os:params.os,
                member_no:params.member_no
            },
            onCompleted:(data)=>{
                console.log(data)
                alert(`장비 ${data.createDevice.device_name} 등록완료`)
                //mutation완료후 refetch함수 실행이 미동작,,, mutaion에 refetchQueries옵션으로 설정해서 refetch진행
                //https://dinn.github.io/development/apollo-client-refetch/
                // getDevice({variables:{params:params}})
                setModalOpen(false)
            }
        })
        //input창 입력값 삭제
        e.target.reset();
    };

    return(
        <CreateDeviceContainer>
                <div className="modal_header">
                <h1>장비 등록</h1>
                <button className="close_button" onClick={()=>{setModalOpen(false)}}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                </div>
                <form onSubmit={onSubmit}>
                        <div className="input_wrap">
                            <label htmlFor="company_no"><span>*</span>기업번호</label>
                            <input id="company_no" type="text" defaultValue={companyNo} disabled></input>
                        </div>
                        <div className="input_wrap">
                            <label htmlFor="company_name"><span>*</span>기업명</label>
                            <input id="company_name" type="text" defaultValue={companyName} disabled></input>
                        </div>
                        <div className="input_wrap">
                            <label htmlFor="device_name"><span>*</span>장비명</label>
                            <input id="device_name" type="text" required></input>
                        </div>
                        <div className="input_wrap">
                            <label htmlFor="os"><span>*</span>OS</label>
                            <select id="os" className="os" required>
                                {osArr.map((item,index)=>{
                                    return <option value={item} key={index}>{item}</option>
                                })}
                            </select>
                        </div>
                        <div className="input_wrap">
                            <label htmlFor="device_user">담당사용자</label>
                            <select id="device_user" onChange={(e)=>{setSelectedUserNo(e.target.value)}}>
                            <option value=""><li>사용자미정</li></option>
                            {
                                userData?.getAllMemberByRoleAndCorpNo.length>0 &&
                                userData.getAllMemberByRoleAndCorpNo.map((item,index)=>{
                                    return <option value={item.member_no} key={index}>{`${item.member_no}:${item.name}`}</option>
                                })
                            }
                            </select>
                        </div>  
                    <button>등록</button>
                </form>
        </CreateDeviceContainer>
    )
};
export default CreateDevice;