import styled from "styled-components";
import { useEffect, useState } from "react";
import MemberTr from "../elements/MemberTr";
import CreateMember from "./CreateMember";

import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import {getAllMemberByRoleAndCorp} from "../graphql/query";
import {GET_getMemberByParams} from "../graphql/query";

const MemberManagerContainer=styled.div`
    height: 100%;
    width: 100%;
    position: relative;

    .title{
        margin: 30px 20px;
        font-size: 20px;
    }
    .menu{
        width: 70%;
        padding: 12px 5px;
        margin: auto;
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        background-color: var(--gray);
        border-radius: 3px;
        input{
            line-height: 30px;
            border: none;
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
        width: 70%;
        margin: 10px auto;
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
    .dimmed{
    /* display: none; */
    position: fixed;
    z-index: 1;
    top: 0;
    left: 20%;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
}
`;

const MemberManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const [loginMemberData, setLoginMemberData] = useState();
    const [roleParam, setRoleParam] = useState();
    const column = ['계정번호','기업명','아이디','이름','계정생성일','계정유효상태'];

    const [getMemberByParams,{loading,data,error}] = useLazyQuery(GET_getMemberByParams);
    // const [getMembers,{data:AllData}] = useLazyQuery(GET_ALLMEMBERBYROLE);
    // const [searchQuery,{data:searchData}] = useLazyQuery(getAllMemberByRoleAndCorp);
    // let [renderData, setRenderData] = useState([]);
    
    //컴포넌트 마운트시점_해당하는 role_no의 모든 계정 조회
    useEffect(()=>{
        // getLoginUser();
        const loginData = JSON.parse(localStorage.getItem("loginUser"))
        setLoginMemberData(loginData);
        setRoleParam(loginData?.role_no+1);

        const params={
            role_no:loginData?.role_no+1,
        }

        getMemberByParams({variables:{params:params}});

        // getMembers({
        //     variables:{role:loginUser.role_no+1},
        //     onCompleted:(_,data)=>{
        //         setRenderData(_.getAllMemberByRole)
        //     }
        // })
    },[])
    //검색버튼 클릭시 해당하는 role_no로 조회된 계정 중 기업이름으로 검색
    const handleSearch=(e)=>{
        e.preventDefault();
        const searchKeword = e.target.search_input.value;
        
        if(roleParam===2 && searchKeword){
                const params={
                    role_no:roleParam,
                    company_name:searchKeword
                }
                getMemberByParams({variables:{params:params}});
                // searchQuery({variables:{role:roleParam,companyName:searchKeword},
                //     onCompleted:(_,data) => {
                //         setRenderData(_.getAllMemberByRoleAndCorp)
                //     }
                // })
        }else if(roleParam===3 && searchKeword){
            const params={
                role_no:roleParam,
                member_name:searchKeword
            }
            getMemberByParams({variables:{params:params}});
        }
    };

    return(
        <MemberManagerContainer>
            {loginMemberData?.role_no === 1?(
                <h1 className="title"> [기업관리자 계정 관리] </h1>
                ):(
                    <h1 className="title"> [사용자 계정 관리] </h1>
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
            {loginMemberData?.role_no === 1?(
                <button className="create_member_btn" onClick={()=>{setModalOpen(true)}}>계정등록</button>
            ):(
                ""
            )}
            </div>
            {
                <table>
                    <colgroup>
                        <col width="10%"></col>
                        <col width="20%"></col>
                        <col width="20%"></col>
                        <col width="0%"></col>
                        <col width="20%"></col>
                        <col width="20%"></col>
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
                              <p>등록된 계정이 없습니다.</p>  
                            ) 
                            }
                    </tbody>
                </table>
            }
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