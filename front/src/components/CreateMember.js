import styled from "styled-components";

const CreateMemberContainer=styled.div`
    width: 600px;
    height: 300px;
    margin: auto;
    background-color: var(--gray);

`;

const CreateMember=({setModalOpen})=>{
    return(

        <CreateMemberContainer>
                <button onClick={()=>{setModalOpen(false)}}>창닫기</button>
                <h1>계정 생성</h1>
                <form>
                    <div className="input_wrap">
                        <label id="companyNo">회사명</label>
                        <input id="companyNo" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label id="companyNo">아이디</label>
                        <input id="companyNo" type="text" required></input>
                    </div>
                    <div className="input_wrap">
                        <label id="companyNo">성명</label>
                        <input id="companyNo" type="text" required></input>
                    </div>
                </form>
        </CreateMemberContainer>
    )
};
export default CreateMember;