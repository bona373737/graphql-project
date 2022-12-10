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

// 파라미터 role_no:Int / member_name:String / company_name:String
export const GET_getMemberByParams =gql`
query getMemberByParams($params: MemberParams) {
 getMemberByParams(params: $params) {
   id
   name
   role_no
   member_no
   reg_date
   isavailable
   company_no {
     business_number
     company_name
     company_no
   }
 } 
}
`;

// 파라미터  company_name:String / business_number:String
export const GET_getCompanyByParams=gql`
query GetCompanyByParams($params: CorpParams) {
  getCompanyByParams(params: $params) {
    business_number
    company_name
    company_no
    device_total
  }
}
`;

// 파라미터  company_no:Int / member_no:Int
export const GET_GetAllDeviceByParams=gql`
query GetAllDeviceByParams($params: Params) {
  getAllDeviceByParams(params: $params) {
    company_no
    device_name
    device_no
    member_no
    os
    reg_date
  }
}
`;

// =========== Mutation ============================================================================
export const M_createCompany=gql`
mutation createCompany($companyName: String!, $businessNumber: String!) {
createCompany(company_name: $companyName, business_number: $businessNumber)
}
`;

export const M_createDevice= gql`
  mutation createDevice(
    $company_no:Int!
    $member_no:Int!
    $os:String!
    $device_name:String!
){
  createDevice(
    company_no:$company_no
    member_no:$member_no
    os:$os
    device_name:$device_name
  ){
    device_no
    company_no
    member_no
    os
    device_name
    reg_date
  }
}
`;

