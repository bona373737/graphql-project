import { gql } from "apollo-server";

//graphQL 시키마 정의
const typeDefs = gql`
    type Query{
        getAllMember : [Member]
        ping : String
    }
    type Member {
        member_no : Int
        id : ID
        name : String
    }
`;

export default typeDefs;