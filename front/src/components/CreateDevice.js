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
    width: 600px;
    height: 400px;
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
            margin: 20px 0;
            label{
                display: inline-block;
                text-align: center;
                width: 120px;
            }
            input{
                width: 300px;
                line-height: 30px;
                text-indent: 5px;
                border: none;
                :focus{
                    outline: none;
                }
                .os{
                    width: 500px;
                    option{
                        width: 300px;
                        line-height: 30px;
                        text-indent: 5px;
                    }
                }
            }
        }
        button{
            width: 100px;
            
        }
    }
`;

//기업사용자만 장비등록가능
const CreateDevice=({setModalOpen})=>{

    const [companyNo, setCompanyNo] = useState();
    const [memberNo, setMemberNo] = useState();
    const [companyName, setCompanyName] = useState();
    const osArr = ["Linux","Window32","Window64"];
    const [createDevice, {loading, data, errror}] = useMutation(M_CREATEDEVICE,{
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
        setCompanyNo(loginUser?.company_no.company_no);
        // const companyNo = loginUser?.company_no.company_no;
        getUsers({variables:{
            role:3,
            companyNo:companyNo
        }})
    },[])

    const onSubmit =async(e)=>{
        e.preventDefault();

        const params={};
        params.company_no=Number(e.target.company_no.value)
            
        createDevice({
            variables:{
            company_no:Number(e.target.company_no.value),
            device_name:e.target.device_name.value,
            os:e.target.os.value,
            member_no:Number(e.target.device_user.value)
            },
            onCompleted:(data)=>{
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
                <button className="close_button" onClick={()=>{setModalOpen(false)}}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <form onSubmit={onSubmit}>
                    <h1>장비 등록</h1>
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
                        <select id="device_user">
                          <option value="">사용자미정</option>
                        {
                            userData?.getAllMemberByRoleAndCorpNo.length>0 &&
                            userData.getAllMemberByRoleAndCorpNo.map((item,index)=>{
                                return <option value={item.company_no.company_no} key={index}>{item.name}</option>
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