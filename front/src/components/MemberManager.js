import styled from "styled-components";
import { useEffect, useState } from "react";
import MemberTr from "../elements/MemberTr";
import CreateMember from "./CreateMember";
import { BiSearchAlt } from 'react-icons/bi';
import { BsPlusLg } from 'react-icons/bs';
import { AiFillCheckCircle } from 'react-icons/ai';




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
            color: var(--mainColor);
            margin: 40px 0;
            margin-top: 15px;
            font-size: 20px;
            font-weight: bold;
        }   
        .menu{
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            width: 100%;
            margin: auto;
            /* margin-bottom: 20px; */
            /* background-color: var(--mainColor); */
            border-radius: 5px;
            .filter_wrap{
                width: 300px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                select{
                    width: 200px;
                    height: 28px;
                    border: 0.2px solid var(--pointColor);
                    border-radius: 20px;
                    text-indent: 15px;
                    color: var(--pointColor);
                }
            }
            label{
                color: var(--mainColor);
            }
            input{
                width: 250px;
                height: 28px;
                border-radius: 20px;
                border: 0.2px solid var(--pointColor);
                margin: 0 5px;
                text-indent: 15px;
                &:focus{
                    outline: none;
                    border: 1px solid var(--pointColor);

                }
                &::placeholder{
                    text-indent: 15px;
                    color: var(--pointColor);
                }
            }
            svg{
                position: relative;
                right: 32px;
                color: var(--pointColor);
                font-size: 20px;
                vertical-align: middle;
                cursor: pointer;
                
            }
            .create_member_btn{
                padding: 4px 15px;
                height: 30px;
                border: none;
                border-radius: 20px;
                background-color: var(--pointColor);
                color: white;

                cursor: pointer;
                &:hover{
                    /* background-color: var(--pointColor); */
                    /* color: white; */
                }
                svg{
                    color: white;
                    margin-right: 5px;
                    position: relative;
                    left:0px;
                    font-size: 16px;
                    vertical-align: middle;
                }
            }
        }
        table{
            box-sizing: border-box;
            text-align: center;
            .colum_tr{
                background-color: #FAFBFF;
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
    const column = ['계정번호','기업명','아이디','이름','계정생성일','계정상태'];

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
                <h1 className="title"> 장비목록 </h1>
                ):(
                    <h1 className="title"> 사용자 계정관리 </h1>
                )
            }

            <div className="menu">
            <div className="filter_wrap">
            <select>
                <option>전체</option>
                <option>free_samsung@samsung.com</option>
                <option>free_sinhan@sinhan.com</option>
                <option>free_nana@nana.com</option>
                <option>free_haha@haha.com</option>
            </select>
            <div>
                장비총계 4
            </div>
            {/* <form onSubmit={handleSearch}>
                <input id="search_input" placeholder={loginMemberData?.role_no === 1? "기업 검색":"사용자 검색"}></input>
                <BiSearchAlt/>
            </form> */}
            </div>
            {/* {loginMemberData?.role_no === 2 || loginMemberData?.role_no === 1?(
                <button className="create_member_btn" onClick={()=>{setModalOpen(true)}}><AiOutlinePlusCircle/>계정등록</button>
            ):(
                ""
            )} */}
            </div>
            {
                <table>
                    <colgroup>
                        <col width="20%" ></col>
                        <col width="10%"></col>
                        <col width="8%"></col>
                        <col width="10%"></col>
                        <col width="20%"></col>
                        <col width="10%"></col>
                    </colgroup>
                    <thead>
                        <tr className="colum_tr">
                            <th rowSpan={2}>기업아이디</th>
                            <th colSpan={3}>서비스</th>
                            <th rowSpan={2}>장비명</th>
                            <th rowSpan={2}>장비아이디</th>
                            <th rowSpan={2}>장비IP</th>
                            <th rowSpan={2}>OS</th>
                        </tr>
                        <tr className="colum_tr">
                            <th>헬스체크</th>
                            <th>비밀번호관리</th>
                            <th>웹장애모니터링</th>
                        </tr>
                        {/* <tr className="colum_tr">
                            {
                                column.map((item,index)=>{
                                    return <th key={index}>{item}</th>
                                })
                            }
                        </tr> */}
                    </thead>
                    <tbody>
                        <tr>
                            <td>free_samsung@samsung.com</td>
                            <td><AiFillCheckCircle/></td>
                            <td><AiFillCheckCircle/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>free_sinhan@sinhan.com</td>
                            <td><AiFillCheckCircle/></td>
                            <td><AiFillCheckCircle/></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>free_nana@nana.com</td>
                            <td></td>
                            <td></td>
                            <td><AiFillCheckCircle/></td>
                        </tr>
                        <tr>
                            <td>free_haha@haha.com</td>
                            <td></td>
                            <td></td>
                            <td><AiFillCheckCircle/></td>
                        </tr>
                            {/* {data?.getMemberByParams.length>0 ? (
                                data.getMemberByParams.map((item,index)=>{ 
                                    return <MemberTr key={index} memberData={item}></MemberTr>
                                })
                            ):(
                                <tr>
                                    <td colSpan="6">등록된 계정이 없습니다.</td>
                                </tr>
                            ) 
                            } */}
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