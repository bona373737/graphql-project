import styled from "styled-components";

const UserManagerContainer=styled.div`
    .title{
        margin: 30px 20px;
        font-size: 20px;
    }
`;

const UserManager=({role_no})=>{
    console.log(role_no)
    return(
        <UserManagerContainer>
            <h1 className="title"> [UserManager_사용자 계정 관리]</h1>
        </UserManagerContainer>
    )

}
export default UserManager;