import { gql } from "@apollo/client";

export const LOGINUSER = gql`
  query NoTokenAPI($loginUserId: String!, $password: String!) {
    loginUser(id: $loginUserId, password: $password) {
      token
      user {
        id
        password
        name
        nick_name
        address
        admin
      }
    }
  }
`;

export const GET_ADMIN = gql`
  query NoTokenAPI($getAdminId: String!) {
    getAdmin(id: $getAdminId) {
      id
      name
      nick_name
      address
      admin
    }
  }
`;

export const GET_USER_COUNT = gql`
  query NoTokenAPI {
    getCountUser {
      user_count
    }
  }
`;

export const GET_SHOWPRODUCT = gql`
  query NoTokenAPI {
    getShowProduct {
      id
      mall_name
      product_name
      price
      profit
      detail
      img_url
    }
  }
`;

export const GET_PRODUCTINFO = gql`
  query NoTokenAPI($productId: Int!) {
    getBuyProduct(product_id: $productId) {
      id
      mall_name
      product_name
      price
      profit
      detail
      img_url
    }
  }
`;

export const GET_MALL_PRODUCT = gql`
  query NoTokenAPI($nickName: String!) {
    getMallProduct(nick_name: $nickName) {
      id
      mall_name
      product_name
      price
      profit
      detail
      img_url
    }
  }
`;

export const GET_PURCHASE_USER = gql`
  query NoTokenAPI($nickName: String!) {
    getUserProduct(nick_name: $nickName) {
      id
      user_product_id
      nick_name
      product_name
      number
      total_price
      img_url
    }
  }
`;

export const GET_PROFIT_PRODUCT = gql`
  query NoTokenAPI {
    getAllProductProfit {
      total_count
      total_profit
    }
  }
`;

///////////////////////////////////////////////////// mutation

export const CREACTUSER = gql`
  mutation NoTokenAPI(
    $createUserId: String!
    $password: String!
    $name: String!
    $nickName: String!
    $address: String!
    $admin: Int!
  ) {
    createUser(
      id: $createUserId
      password: $password
      name: $name
      nick_name: $nickName
      address: $address
      admin: $admin
    )
  }
`;

export const USER_INFO = gql`
  mutation NoTokenAPI($updateUserId: String!, $address: String!) {
    updateUser(id: $updateUserId, address: $address)
  }
`;

export const CREATE_PRODUCT = gql`
  mutation NoTokenAPI(
    $mallName: String!
    $productName: String!
    $price: Int!
    $detail: String!
  ) {
    createProduct(
      mall_name: $mallName
      product_name: $productName
      price: $price
      detail: $detail
    )
  }
`;

export const DELETE_PRODUCT = gql`
  mutation NoTokenAPI($adminProductDeleteId: Int!) {
    adminProductDelete(id: $adminProductDeleteId)
  }
`;

export const PURCHASE = gql`
  mutation NoTokenAPI(
    $userProductId: Int!
    $nickName: String!
    $productName: String!
    $number: Int!
    $totalPrice: Int!
    $imgUrl: String!
  ) {
    userPurchase(
      user_product_id: $userProductId
      nick_name: $nickName
      product_name: $productName
      number: $number
      total_price: $totalPrice
      img_url: $imgUrl
    )
  }
`;

export const PROFIT = gql`
  mutation NoTokenAPI($profit: Int!, $productProfitId: Int!) {
    productProfit(profit: $profit, id: $productProfitId)
  }
`;
