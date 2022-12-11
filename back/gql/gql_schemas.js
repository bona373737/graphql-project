import { gql } from "apollo-server";

//graphQL 시키마 정의
const typeDefs = gql`
    type Query{
        loginMember(id:String!,password:String!): Auth

        getAllRole: [Role]
        getAllCompany:[Company]

        getAllDeviceByParams(params:Params): [Device]
        getMemberByParams(params:MemberParams): [Member]
        getCompanyByParams(params:CorpParams) : [Company]
        
        # #####삽질쿼리..위의 쿼리로 코드수정해야함
        getAllDeviceByCompany: [DeviceByCompany]
        getAllMemberByRole(role:Int!): [Member]
        getAllMemberByRoleAndCorp(role:Int!,companyName:String!): [Member]
        getAllMemberByRoleAndCorpNo(role:Int!,companyNo:Int!): [Member]
        getDeviceByCompany: [Device]
        
        # #####사용안함
        # getCompanyByCompanyNo(companyNo:Int!) : Company
        # getAllAdminMember: [Member]
        # getAllMember: [Member]
        # getMemberByCompanyName(companyName:String!): [Member]
        # getMemberByMemberName(memberName:String!):[Member]
        # getCountDevice: Int
        # getDeviceByCorpAndMember(companyNo:Int!,memberNo:Int!): [Device]
        # getAllDevice: [Device]
    }
    type Mutation {
        createMember(
            role_no: Int!
            company_no: Int
            name: String!
            id: String!
            password: String!
        ): String!

        updateMember(
            member_no:Int!
            isavailable:Boolean!
        ): String!

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

        createCompany(
            company_name:String!
            business_number:String!
        ): String!
    }
    #------------------------------------------------------------
    type Auth {
        token:String!
        memberData: Member!
    }

    type Role {
        role_no:Int!
        role_name:String!
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
        device_total:Int
    }

    type CompanyWrap{
        device_total:Count
        company_info: Company
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
    type Count{
        device_total:Int
    }

    input Params{
        company_no:Int
        member_no:Int
    }

    input MemberParams{
        role_no:Int
        company_no:Int
        member_name:String
        company_name:String
    }

    input CorpParams{
        company_name:String
        business_number:String
    }
`;

export default typeDefs;