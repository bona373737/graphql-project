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
    ){
      member_no
      role_no
      id
      name
      reg_date
      isavailable
      company_no{
        company_name
      }
    }
  }
`;
