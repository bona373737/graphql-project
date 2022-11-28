const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    getAdmin(id: String!): [Admin]

    getCountUser: [Count]

    getShowProduct: [Product]

    getBuyProduct(product_id: Int!): [Product]

    getBuyProductSizeStock(product_id: Int!): [ProductSizeStock]

    getProductProfit(id: Int!): [Product]

    getUserProduct(nick_name: String!): [UserProduct]

    getMallProduct(nick_name: String!): [Product]

    getAllProductProfit: [TotalProfit]

    getMallProductProfit: [Product]

    # 에러 다 처리하고 로그인 해결하기
    loginUser(id: String!, password: String!): Message!
  }

  type Admin {
    id: String!
    name: String!
    nick_name: String!
    address: String!
    admin: Int!
  }

  type Count {
    user_count: Int
  }

  type Users {
    id: String!
    password: String!
    name: String!
    nick_name: String!
    address: String!
    admin: Int!
  }

  type TotalProfit {
    total_count: Int!
    total_profit: Int!
  }

  type UserProduct {
    id: Int!
    user_product_id: Int!
    nick_name: String!
    product_name: String
    size: String
    number: Int
    total_price: Int
    img_url: String
  }

  type ProductSizeStock {
    id: Int!
    product_id: Int!
    product_size: String
    stock: Int
  }

  type Product {
    id: Int!
    mall_name: String!
    product_name: String!
    price: Int!
    profit: Int
    detail: String!
    img_url: String
  }

  type Message {
    token: String
    user: Users
  }

  type Mutation {
    createUser(
      id: String!
      password: String!
      name: String!
      nick_name: String!
      address: String!
      admin: Int!
    ): Int

    updateUser(id: String!, address: String!): Int

    userPurchase(
      user_product_id: Int!
      nick_name: String!
      product_name: String!
      size: String
      number: Int!
      total_price: Int!
      img_url: String!
    ): Int

    productSizeStock(stock: Int!, product_id: Int!, product_size: String!): Int

    productProfit(profit: Int!, id: Int!): Int

    adminProductDelete(id: Int!): Int

    createProduct(
      mall_name: String!
      product_name: String!
      price: Int!
      profit: Int
      detail: String!
      img_url: String
    ): Int
  }
`;

module.exports = [typeDefs];
