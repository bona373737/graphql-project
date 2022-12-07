import { gql } from "@apollo/client";

export const GET_loginMember = gql`
  query loginMember($id: String!, $password: String!) {
      loginMember(id: $id, password: $password) {
        token
        memberData {
          member_no
          id
          name
          role_no
          reg_date
          company_no{
            company_no
            company_name
            business_number
          }
        }
      }
    }
`;
export const GET_getAllMemberByRole = gql`
query GetAllMemberByRole($role: Int!) {
  getAllMemberByRole(role: $role) {
    company_no {
      business_number
      company_name
      company_no
    }
    id
    isavailable
    member_no
    name
    reg_date
    role_no
  }
}
`;

export const GET_getAllMemberByRoleAndCorp=gql`
query getAllMemberByRoleAndCorp($role:Int!, $companyName:String!){
  getAllMemberByRoleAndCorp(
    role:$role,
    companyName:$companyName){
      member_no
      id
      name
      reg_date
      isavailable
      company_no{
        company_no
        company_name
        business_number
      }

    }
}
`;