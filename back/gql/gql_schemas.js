import { gql } from "apollo-server";

//graphQL 시키마 정의
const typeDefs = gql`
    type Query{
        member(id:ID) : Member
        getAllMember : [Member]
        ping : String
    }
    type Member {
        member_no : Int
        id : ID
        name : String
    }
    type Mutation {
        createMember(
            member_no : Int
            role_no : Int
            company_no : Int
            name: String
            id : String
            password : String
            reg_date : String
            delete_date : String
            isavailable : Boolean
        ): Boolean
    }
`;

export default typeDefs;