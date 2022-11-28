const sql = require("../db/dbExe");
const login = require("../auth/login");

const resolvers = {
  Query: {
    getAdmin: async (_, { id }) => {
      try {
        let result = await sql.getAdminExe(id);
        return result;
      } catch (error) {
        console.log("getAdmin Error: " + error);
        throw error;
      }
    },

    getCountUser: async () => {
      try {
        console.log("getCountUser resolvers");
        let result = await sql.getCountUserExe();
        return result;
      } catch (error) {
        console.log("getCountUser Error: " + error);
        throw error;
      }
    },

    getShowProduct: async () => {
      try {
        console.log("getShowProduct resolvers");
        let result = await sql.getShowProductExe();
        return result;
      } catch (error) {
        console.log("getShowProduct Error: " + error);
        throw error;
      }
    },

    getBuyProduct: async (_, { product_id }) => {
      try {
        console.log("getBuyProduct");
        let result = await sql.getBuyProductExe(product_id);
        return result;
      } catch (error) {
        console.log("getBuyProduct Error: " + error);
        throw error;
      }
    },

    getBuyProductSizeStock: async (_, { product_id }) => {
      try {
        console.log("getBuyProductSizeStock");
        let result = await sql.getBuyProductSizeStockExe(product_id);
        return result;
      } catch (error) {
        console.log("getBuyProductSizeStock Error: " + error);
        throw error;
      }
    },

    getProductProfit: async (_, { id }) => {
      try {
        console.log("getProductProfit");
        let result = await sql.getProductProfitExe(id);
        return result;
      } catch (error) {
        console.log("getProductProfit Error: " + error);
        throw error;
      }
    },

    getUserProduct: async (_, { nick_name }) => {
      try {
        console.log("getUserProduct");
        let result = await sql.getUserProductExe(nick_name);
        return result;
      } catch (error) {
        console.log("getUserProduct Error: " + error);
        throw error;
      }
    },

    getMallProduct: async (_, { nick_name }) => {
      try {
        console.log("getMallProduct");
        let result = await sql.getMallProductExe(nick_name);
        return result;
      } catch (error) {
        console.log("getMallProduct Error: " + error);
        throw error;
      }
    },

    getAllProductProfit: async () => {
      try {
        console.log("getAllProductProfit");
        let result = await sql.getAllProductProfitExe();
        return result;
      } catch (error) {
        console.log("getAllProductProfit Error: " + error);
        throw error;
      }
    },

    getMallProductProfit: async () => {
      try {
        console.log("getMallProductProfit");
        let result = await sql.getMallProductProfitExe();
        return result;
      } catch (error) {
        console.log("getMallProductProfit Error: " + error);
        throw error;
      }
    },

    loginUser: async (_, { id, password }) => {
      try {
        const result = await login.loginExe(id, password);
        console.log("User Logined with this result: " + JSON.stringify(result));
        if (result == undefined) {
          throw new Error("no such user");
        }
        console.log(result);
        return result;
      } catch (error) {
        console.log(`User Login is failed because of this error: ${error}`);
        throw error;
      }
    },
  },

  Mutation: {
    createUser: async (
      _,
      {
        id = null,
        password = null,
        name = null,
        nick_name = null,
        address = null,
        admin = null,
      }
    ) => {
      try {
        let data = {
          id: id,
          password: password,
          name: name,
          nick_name: nick_name,
          address: address,
          admin: admin,
        };
        const result = await sql.createUserExe(data);

        return result.affectedRows;
      } catch (error) {
        console.log(`createUser res Error: ${error}`);
        throw error;
      }
    },

    updateUser: async (_, { id = null, address = null }) => {
      try {
        let inputList = {
          id: id,
          address: address,
        };
        let result;
        result = await sql.updateUserExe(inputList);
        return result.affectedRows;
      } catch (error) {
        console.log(`updateUser Error: ${error}`);
        throw error;
      }
    },

    userPurchase: async (
      _,
      {
        user_product_id = null,
        nick_name = null,
        product_name = null,
        size = null,
        number = null,
        total_price = null,
        img_url = null,
      }
    ) => {
      try {
        let purchase = {
          user_product_id: user_product_id,
          nick_name: nick_name,
          product_name: product_name,
          size: size,
          number: number,
          total_price: total_price,
          img_url: img_url,
        };
        let result;
        result = await sql.userPurchaseExe(purchase);
        return result.affectedRows;
      } catch (error) {
        console.log(`userPurchase Error: ${error}`);
        throw error;
      }
    },

    productSizeStock: async (
      _,
      { stock = null, product_id = null, product_size = null }
    ) => {
      try {
        let productSizeStock = {
          stock: stock,
          product_id: product_id,
          product_size: product_size,
        };
        let result;
        result = await sql.productSizeStockExe(productSizeStock);
        return result.affectedRows;
      } catch (error) {
        console.log(`productSizeStock Error: ${error}`);
        throw error;
      }
    },

    productProfit: async (_, { profit = null, id = null }) => {
      try {
        let profits = {
          profit: profit,
          id: id,
        };
        let result;
        result = await sql.productProfitExe(profits);
        return result.affectedRows;
      } catch (error) {
        console.log(`productProfit Error: ${error}`);
        throw error;
      }
    },

    adminProductDelete: async (_, { id }) => {
      try {
        const result = await sql.adminProductDeleteExe(id);
        return result.affectedRows;
      } catch (error) {
        console.log(`adminProductDelete Error: ${error}`);
        throw error;
      }
    },

    createProduct: async (
      _,
      {
        mall_name = null,
        product_name = null,
        price = null,
        profit = null,
        detail = null,
        img_url = null,
      }
    ) => {
      try {
        let products = {
          mall_name: mall_name,
          product_name: product_name,
          price: price,
          profit: profit,
          detail: detail,
          img_url: img_url,
        };
        const result = await sql.createProductExe(products);
        return result.affectedRows;
      } catch (error) {
        console.log(`createProduct Error: ${error}`);
        throw error;
      }
    },
  },
};

module.exports = resolvers;
