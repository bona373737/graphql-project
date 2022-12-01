import styled from "styled-components";

const MemberListContainer=styled.tr`


`;

const MemberList=({state})=>{
    return(
        state &&
            <MemberListContainer>
                <td>{state.__typename}</td>
                <td>{state.member_no}</td>
                <td>{state.role_no}</td>
                <td>{state.company_no}</td>
                <td>{state.id}</td>
                <td>{state.name}</td>
                <td>{state.reg_date}</td>
                <td>{String(state.isavailable)}</td>
            </MemberListContainer> 
    )
}
export default MemberList;