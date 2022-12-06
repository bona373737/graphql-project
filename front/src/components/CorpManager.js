import styled from "styled-components";
import { GET_ALLMEMBERBYROLE } from "../graphql/query";
import {getAllMemberByRoleAndCorp} from "../graphql/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import MemberTr from "../elements/MemberTr";
import CreateMember from "./CreateMember";

const CorpManagerContainer=styled.div`
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

        };
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

const CorpManager=()=>{
    const [modalOpen, setModalOpen] = useState(false);
    const column = ['계정번호','기업명','아이디','이름','계정생성일','계정유효상태']

    // const [getAllAdmin,{loading,data,error}] = useLazyQuery(GET_ALLMEMBERBYROLE);
    const [getAllAdmin,{loading,data:AllData,error}] = useLazyQuery(GET_ALLMEMBERBYROLE);
    const [searchQuery,{data:searchData}] = useLazyQuery(getAllMemberByRoleAndCorp);
    let [renderData, setRenderData] = useState([]);


    //컴포넌트 마운트될때 role_no가 2번인 계정 전체조회
    useEffect(()=>{
        getAllAdmin({
            variables:{role:2},
            onCompleted:(_,data)=>{
                setRenderData(_.getAllMemberByRole)
            }
        })
    },[])

    //검색버튼 클릭시 role_no가 2번인 계정 중 기업이름으로 계정조회
    const handleSearch=(e)=>{
        e.preventDefault();
        const searchKeword = e.target.search_input.value;

        if(searchKeword){
            searchQuery({variables:{role:2,companyName:searchKeword},
                onCompleted:(_,data) => {
                    setRenderData(_.getAllMemberByRoleAndCorp)
                }
            })
        }
    };

    return(
        <CorpManagerContainer>
            <h1 className="title"> [CorpManager_기업관리자 계정 관리] </h1>
            <div className="menu">
            <form onSubmit={handleSearch}>
                <label htmlFor="search_input">기업명</label>
                <input id="search_input"></input>
                <button>검색</button>
            </form>
            <button className="create_member_btn" onClick={()=>{setModalOpen(true)}}>계정등록</button>
            </div>
            {
                renderData?.length>0 &&
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
                            {
                                renderData.map((item,index)=>{ 
                                    return <MemberTr key={index} memberData={item}></MemberTr>
                                })
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
        </CorpManagerContainer>
    )  

}
export default CorpManager;