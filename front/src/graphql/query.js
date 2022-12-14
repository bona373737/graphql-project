import { gql } from '@apollo/client';

export const GET_NOWMEMBER = gql`
  query nowMember {
    nowMember @client
  }
`;

export const GET_LOGINMEMBER = gql`
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

export const GET_ALLDEVICE  = gql`
  query getAllDevice {
    getAllDevice {
      device_no
      device_name
      company_no
      member_no
      os
      reg_date
    }
  }
`;

export const GET_ALLMEMBERBYROLE = gql`
  query getAllMemberByRole($role:Int!) {
    getAllMemberByRole(role:$role){
      member_no
      role_no
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

export const getAllMemberByRoleAndCorp=gql`
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

export const GET_getAllMemberByRoleAndCorpNo=gql`
query getAllMemberByRoleAndCorpNo($role:Int!,$companyNo:Int!){
  getAllMemberByRoleAndCorpNo(
    role:$role,
    companyNo:$companyNo){
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


export const getAllDeviceByCompany =gql`
  query getAllDeviceByCompany {
    getAllDeviceByCompany {
      company_name
      business_number
      company_no {
        company_no
        device_no
        device_name
        member_no
        os
        reg_date
      }
  }
}
`;

export const getDeviceByCorpAndMember=gql`
query getDeviceByCorpAndMember($companyNo:Int!,$memberNo:Int!){
  getDeviceByCorpAndMember(
    companyNo:$companyNo,
    memberNo:$memberNo){
      device_no
      company_no
      member_no
      os
      device_name
      reg_date
    }
}
`;

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

export const GET_AllCompany=gql`
query getAllCompany {
  getAllCompany {
    business_number
    company_name
    company_no
  }
}
`;

export const GET_AllRole=gql`
query getAllRole {
  getAllRole{
    role_no
    role_name
  }
}
`;


// ===================================================

export const M_CREATEMEMBER = gql`
  mutation createMember(
    $role_no: Int!
    $company_no: Int!
    $name: String!
    $id: String!
    $password: String!
  ) {
    createMember(
      role_no:$role_no
      company_no:$company_no
      name:$name
      id:$id
      password:$password
    )
  }
`;
export const M_updateMember =gql`
  mutation Mutation($memberNo: Int!, $isavailable: Boolean!) {
    updateMember(member_no: $memberNo, isavailable: $isavailable)
  }
`;

export const M_CREATEDEVICE= gql`
  mutation createDevice(
    $company_no:Int!
    $member_no:Int
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
