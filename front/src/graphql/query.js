import { gql } from '@apollo/client';

export const GET_LOGINMEMBER = gql`
query loginMember($loginMemberId: String!, $password: String!) {
    loginMember(id: $loginMemberId, password: $password) {
      token
      memberData {
        id
        member_no
        name
      }
    }
  }
`;
