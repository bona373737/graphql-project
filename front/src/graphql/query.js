import { gql } from '@apollo/client';

export const GET_LOGINMEMBER = gql`
  query loginMember($id: String!, $password: String!) {
      loginMember(id: $id, password: $password) {
        token
        memberData {
          member_no
          id
          name
          role_no
          company_no
          reg_date
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
      company_no
      id
      name
      reg_date
      isavailable
    }
  }
`;


