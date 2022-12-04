import styled from "styled-components";

const MemberListContainer=styled.tr`


`;

const MemberTr=({memberData})=>{
    return(
        memberData &&
            <MemberListContainer>
                <td>{memberData.member_no}</td>
                <td>{memberData.company_no.company_name}</td>
                <td>{memberData.id}</td>
                <td>{memberData.name}</td>
                <td>{memberData.reg_date}</td>
                <td>{String(memberData.isavailable)}</td>
            </MemberListContainer> 
    )
}
export default MemberTr;