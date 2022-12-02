import { gql } from "apollo-server";

//graphQL 시키마 정의
const typeDefs = gql`
    type Query{
        loginMember(id:String!,password:String!): Auth
        getAllMember: [Member]
        getAllAdminMember: [Member]
        getAllMemberByRole(role:Int!): [Member]
        getMemberByCompanyName(companyName:String!): [Member]
        getMemberByMemberName(memberName:String!):[Member]
        getAllCompany:[Company]
        getCompanyByCompanyNo(companyNo:Int!) : Company
        getCountDevice: Int
        getDeviceByCompany : [Device]
        getAllDevice: [Device]
        getAllDeviceByCompany: [DeviceByCompany]
    }
    type Mutation {
        createMember(
            role_no: Int!
            company_no: Int
            name: String!
            id: String!
            password: String!
        ): Member

        updateMember(
            role_no: Int!
            company_no: Int
            id:String!
            name: String!
            password: String!
            isavailable:Boolean!
        ): Member

        createDevice(
            company_no:Int!
            member_no:Int!
            os:String!
            device_name:String!
        ) : Device

        updateDevice(
            device_no:Int!
            device_name:String!
            os:String!
            member_no:Int!
        ): Device
    }
    #------------------------------------------------------------
    type Auth {
        token:String!
        memberData: Member!
    }
    type Member {
        member_no:Int!
        role_no:Int!
        company_no:Company
        id: ID!
        name: String!
        reg_date:String!
        isavailable:Boolean!
    }

    type Company{
        company_no:Int!
        company_name:String!
        business_number:String!
    }

    type Device {
        device_no:Int!
        company_no:Int!
        member_no:Int!
        os:String!
        device_name:String!
        reg_date:String!
    }

    type DeviceByCompany {
        company_name:String!
        business_number:String!
        company_no: [Device]
    }
`;

export default typeDefs;