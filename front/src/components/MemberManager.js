import styled from "styled-components";
import { useEffect, useState } from "react";
import MemberTr from "../elements/MemberTr";
import CreateMember from "./CreateMember";

import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import {getAllMemberByRoleAndCorp} from "../graphql/query";
import {GET_getMemberByParams} from "../graphql/query";

const MemberManagerContainer=styled.div`
    /* position: relative; */
    height: 100%;
    width: 100%;
    /* flex: 1; */
    .contents_wrap{
        min-width: 800px;
        margin: auto;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .title{
            text-align: center;
            color: var(--mainColor);
            margin: 40px 0;
            font-size: 20px;
            font-weight: bold;
        }   
        .menu{
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 12px 16px;
            width: 100%;
            margin: auto;
            margin-bottom: 20px;
            background-color: var(--mainColor);
            border-radius: 5px;
            label{
                color: white;
            }
            input{
                height: 28px;
                border: none;
                border-radius: 3px;
                border-bottom: 1px solid var(--gray);
                margin: 0 5px;
                &:focus{
                    outline: none;
                }
    
            }
            button{
                width: 80px;
                height: 30px;
                border: none;
                cursor: pointer;
                &:hover{
                    background-color: white;
                }
            }
        }
        table{
            box-sizing: border-box;
            text-align: center;
            .colum_tr{
                border-bottom: 1px solid var(--gray);
            }
            tr{
                line-height: 40px;
    
            }
            td{
                vertical-align: middle;
    
            }
        }
    }
    .dimmed{
        /* display: none; */
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0%;
        width: 100%;
        height: 100%;
        background-color: var(--mainColor);
        opacity: 0.5;
    }
`;

const MemberManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [loginMemberData, setLoginMemberData] = useState();
    const [roleParam, setRoleParam] = useState();
    const column = ['계정번호','기업명','아이디','이름','계정생성일','계정유효상태'];

    const [getMemberByParams,{loading,data,error}] = useLazyQuery(GET_getMemberByParams,{
        fetchPolicy:'network-only',
    });
    // const [getMembers,{data:AllData}] = useLazyQuery(GET_ALLMEMBERBYROLE);
    // const [searchQuery,{data:searchData}] = useLazyQuery(getAllMemberByRoleAndCorp);
    // let [renderData, setRenderData] = useState([]);
    
    //사이트관리자로 접속시 기업관리자(role_no) 전체조회 
    //기업관리자로 접속시 해당기업(company_no)의 사용자(role_no) 전체조회
    useEffect(()=>{
        const loginData = JSON.parse(localStorage.getItem("loginUser"))
        setLoginMemberData(loginData);
        setRoleParam(loginData?.role_no+1);

        const params={
            role_no:loginData?.role_no+1,
        }

        if(loginData.role_no === 2){
            params['company_no'] = loginData.company_no.company_no;
        }

        getMemberByParams({variables:{params:params},fetchPolicy:'network-only'});

    },[])
    //검색버튼 클릭시 해당하는 role_no로 조회된 계정 중 기업이름으로 검색
    const handleSearch=(e)=>{
        e.preventDefault();
        const searchKeword = e.target.search_input.value;

        if(!searchKeword){
            switch (loginMemberData.role_no) {
                case 1:
                    getMemberByParams({variables:{params:{role_no:roleParam}}});
                    break;
                case 2:
                    getMemberByParams({variables:{params:{role_no:roleParam,company_no:loginMemberData.company_no.company_no}}});
                    break;
                default:
                    break;
            }
            
        }else {
            let params={}
            switch (loginMemberData.role_no) {
                case 1:
                    params={
                        role_no:roleParam,
                        company_name:searchKeword
                    }
                    getMemberByParams({variables:{params:params}});
                    break;
                case 2:
                    params={
                        role_no:roleParam,
                        company_no:parseInt(loginMemberData.company_no.company_no),
                        member_name:searchKeword
                    }
                    getMemberByParams({variables:{params:params}});
                    break;
                default:
                    break;
            }
        }
    };

    return(
        <MemberManagerContainer>
            <section className="contents_wrap">
            {loginMemberData?.role_no === 1?(
                <h1 className="title"> 기업관리자 계정 관리</h1>
                ):(
                    <h1 className="title"> 사용자 계정 관리 </h1>
                )
            }

            <div className="menu">
            <form onSubmit={handleSearch}>
                {loginMemberData?.role_no === 1?(
                    <label htmlFor="search_input">기업명</label>
                    ):(
                    <label htmlFor="search_input">사용자명</label>
                    )
                }
                <input id="search_input"></input>
                <button>검색</button>
            </form>
            {loginMemberData?.role_no === 2 || loginMemberData?.role_no === 1?(
                <button className="create_member_btn" onClick={()=>{setModalOpen(true)}}>계정등록</button>
            ):(
                ""
            )}
            </div>
            {
                <table>
                    <colgroup>
                        <col width="10%" ></col>
                        <col width="15%"></col>
                        <col width="20%"></col>
                        <col width="0%"></col>
                        <col width="20%"></col>
                        <col width="15%"></col>
                    </colgroup>
                    <thead>
                        <tr className="colum_tr">
                            {
                                column.map((item,index)=>{
                                    return <th key={index}>{item}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                            {data?.getMemberByParams.length>0 ? (
                                data.getMemberByParams.map((item,index)=>{ 
                                    return <MemberTr key={index} memberData={item}></MemberTr>
                                })
                            ):(
                                <tr>
                                    <td colSpan="6">등록된 계정이 없습니다.</td>
                                </tr>
                            ) 
                            }
                    </tbody>
                </table>
                }
                </section>
            {
                modalOpen &&
                <>
                <CreateMember setModalOpen={setModalOpen}></CreateMember>
                <div className="dimmed"></div>
                </>
            }
        </MemberManagerContainer>
    )  

}
export default MemberManager;