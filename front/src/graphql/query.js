import { gql } from '@apollo/client';

export const GET_LOGINMEMBER = gql`
  query loginMember($id: String!, $password: String!) {
      loginMember(id: $id, password: $password) {
        token
        memberData {
          id
          member_no
          name
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
