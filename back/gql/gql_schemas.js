import { gql } from "apollo-server";

//graphQL 시키마 정의
const typeDefs = gql`
    type Member {
        no : Int
        id : ID
        name : String
    }
    type Query{
        allMembersAdmin : [Member]
        memberAdmin(id:ID!) : Member
    }
    type Mutation{
        postMemberAdmin(name:String!,id:ID!):Member
        deleteMemberAdmin (id:ID!) : Boolean
    }
`;

export default typeDefs;