import { useMutation } from "@apollo/client";
import styled from "styled-components";
import {M_CREATEMEMBER} from '../graphql/query';

const CreateMemberContainer=styled.div`
    width: 600px;
    height: 300px;
    margin: auto;
    background-color: var(--gray);
`;

const CreateMember=({setModalOpen})=>{

    const [createMember, {loading, data, error}]= useMutation(M_CREATEMEMBER);

    const onSubmit =async(e)=>{
        e.preventDefault();

        const current = e.target        
        await createMember({variables:{
            role_no:Number(current.role_no.value),
            company_no:Number(current.company_no.value),
            name:current.name.value,
            id:current.id.value,
            password:current.password.value
        }})

        //input창 입력값 삭제
        e.target.reset();
    };

    return(
        <CreateMemberContainer>
                <button onClick={()=>{setModalOpen(false)}}>창닫기</button>
                <h1>계정 생성</h1>
                <form onSubmit={onSubmit}>
                    <div className="input_wrap">
                        <label htmlFor="role_no">권한</label>
                        <input id="role_no" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="company_no">회사번호</label>
                        <input id="company_no" type="Number" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="name">성명</label>
                        <input id="name" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="id">아이디</label>
                        <input id="id" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label htmlFor="password">비밀번호</label>
                        <input id="password" type="password" required></input>
                    </div>
                    <button>등록</button>
                </form>
        </CreateMemberContainer>
    )
};
export default CreateMember;