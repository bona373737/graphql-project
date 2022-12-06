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