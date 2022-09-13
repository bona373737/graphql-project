const db = require("./dbCreate");

// 암호화
const crypto = require("crypto");

module.exports = {
  // Query------------------------------------------------------------

  // 사용자인지, 쇼핑몰 관리자인지 확인
  getAdminExe: async function (id = null) {
    try {
      let queryString =
        "select id, name, nick_name, address, admin from users where id = " +
        JSON.stringify(id);
      console.log("getAdmin executed");
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getAdmin Error: " + err);
      throw err;
    }
  },

  getCountUserExe: async function () {
    try {
      let queryString = "select count(*) as user_count from users";
      console.log("getCountUserExe excuted");
      const result = await db.exe(queryString);
      return result;
    } catch (error) {
      console.error("getCountUserExe Error: " + error);
      throw error;
    }
  },

  // 전체 상품 조회
  getShowProductExe: async function () {
    console.log("getShowProduct exe");

    try {
      let queryString = "select * from product";

      console.log("getAllProduct executed");
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getAllProduct Error: " + err);
      throw err;
    }
  },

  // 상품 상세페이지
  getBuyProductExe: async function (product_id = null) {
    try {
      let queryString =
        "select * from product where id = " + JSON.stringify(product_id);
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getBuyProduct Error: " + err);
      throw err;
    }
  },

  // 상품 상세페이지(사이즈 재고 확인)
  getBuyProductSizeStockExe: async function (product_id = null) {
    try {
      let queryString =
        "select * from product_size_stock where product_id = " +
        JSON.stringify(product_id);
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getBuyProductSizeStock Error: " + err);
      throw err;
    }
  },

  // 각각 상품 수익 조회
  getProductProfitExe: async function (id) {
    try {
      let queryString =
        "select * from product where id = " + JSON.stringify(id);
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getProductProfit Error: " + err);
      throw err;
    }
  },

  // 사용자 거래 내역 조회
  getUserProductExe: async function (nick_name = null) {
    try {
      let queryString =
        "select * from user_product where nick_name = " +
        JSON.stringify(nick_name);
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getUserProduct Error: " + err);
      throw err;
    }
  },

  // 쇼핑몰 관리자, 사이트 관리자가 올린 상품 조회
  getMallProductExe: async function (nick_name = null) {
    try {
      let queryString =
        "select * from product where mall_name = " + JSON.stringify(nick_name);
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getMallProduct Error: " + err);
      throw err;
    }
  },

  // 사이트 관리자 운영관리(전체 상품수, 전체 수익)
  getAllProductProfitExe: async function () {
    try {
      let queryString =
        "select count(*) as total_count, sum(profit) as total_profit from product";
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getOperationManageProductCount Error: " + err);
      throw err;
    }
  },

  // 사이트 관리자 운영관리(각 쇼핑몰 수익)
  getMallProductProfitExe: async function () {
    try {
      let queryString =
        "select mall_name, sum(profit) as profit from product group by mall_name";
      const result = await db.exe(queryString);
      return result;
    } catch (err) {
      console.error("getMallProductProfit Error: " + err);
      throw err;
    }
  },

  // Mutation ---------------------------------------------------------------

  // 회원가입
  createUserExe: async function (data) {
    let conn;
    try {
      conn = await db.getPoolConnection();

      function encrypt(pw) {
        const salt = "12456";
        const newpw = crypto
          .createHmac("sha512", salt)
          .update(pw)
          .digest("base64");

        return newpw;
      }

      let queryString =
        "insert into users (id, password, name, nick_name, address, admin) " +
        "value (" +
        "NULLIF(" +
        conn.escape(data["id"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(encrypt(data["password"])) +
        ", null), " +
        "NULLIF(" +
        conn.escape(data["name"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(data["nick_name"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(data["address"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(data["admin"]) +
        ", null)" +
        ")";
      const result = await conn.query(queryString);

      return result;
    } catch (err) {
      console.error("createUser exe Error: 1111" + err);
      throw err;
    } finally {
      if (conn) await db.endPoolConnection(conn);
    }
  },

  // 회원정보 수정
  updateUserExe: async function (inputList) {
    let conn;
    try {
      conn = await db.getPoolConnection();
      let queryString =
        "update users " +
        "set address = NULLIF(" +
        conn.escape(inputList["address"]) +
        ",null)" +
        " where id = " +
        conn.escape(inputList["id"]);
      let result;
      result = await conn.query(queryString);
      console.log("query statement: " + queryString);
      return result;
    } catch (err) {
      console.log("updateUser Error: " + err);
    } finally {
      if (conn) {
        await db.endPoolConnection(conn);
      }
    }
  },

  //-----------------------------------------------------------------------------
  // 상품 구매하기 클릭(사용자 거래 내역에 추가, 사이즈 재고DB 수량 변경, product 수익 변경)
  // 사용자 거래 내역에 추가
  userPurchaseExe: async function (purchase) {
    let conn;
    try {
      conn = await db.getPoolConnection();
      let queryString =
        "insert into user_product (user_product_id, nick_name, product_name, number, total_price, img_url) " +
        "value (" +
        "NULLIF(" +
        conn.escape(purchase["user_product_id"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(purchase["nick_name"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(purchase["product_name"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(purchase["number"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(purchase["total_price"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(purchase["img_url"]) +
        ", null)" +
        ")";
      const result = await conn.query(queryString);
      console.log("userPurchase query" + queryString);
      return result;
    } catch (err) {
      console.log("userPurchase Error: " + err);
      throw err;
    } finally {
      if (conn) {
        await db.endPoolConnection(conn);
      }
    }
  },

  // 사이즈 재고DB 수량 변경
  productSizeStockExe: async function (productSizeStock) {
    let conn;
    try {
      conn = await db.getPoolConnection();
      let queryString =
        "update product_size_stock " +
        "set stock = " +
        JSON.stringify(productSizeStock["stock"]) +
        " where product_id = " +
        JSON.stringify(productSizeStock["product_id"]) +
        " and product_size = " +
        JSON.stringify(productSizeStock["product_size"]);
      const result = await conn.query(queryString);
      console.log("query Statement: " + queryString);
      return result;
    } catch (err) {
      console.log("productSizeStock Error: " + err);
    } finally {
      if (conn) {
        await db.endPoolConnection(conn);
      }
    }
  },

  // product 수익 변경
  productProfitExe: async function (profits) {
    let conn;
    try {
      conn = await db.getPoolConnection();
      let queryString =
        "update product " +
        "set profit = " +
        JSON.stringify(profits["profit"]) +
        " where id = " +
        JSON.stringify(profits["id"]);
      const result = await conn.query(queryString);
      console.log("query Statement: " + queryString);
      return result;
    } catch (err) {
      console.log("productProfit Error: " + err);
    } finally {
      if (conn) {
        await db.endPoolConnection(conn);
      }
    }
  },

  //---------------------------------------------------------------------------
  // 쇼핑몰 관리자, 사이트 관리자(자신이 등록한 상품 삭제 가능)
  adminProductDeleteExe: async function (id) {
    let conn;
    try {
      conn = await db.getPoolConnection();
      let queryString =
        "delete from product " + "where id = " + conn.escape(id);
      const result = await conn.query(queryString);
      console.log("query Statement: " + queryString);
      return result;
    } catch (err) {
      console.log("mallProductDelete Error: " + err);
      throw err;
    } finally {
      if (conn) {
        await db.endPoolConnection(conn);
      }
    }
  },

  // 쇼핑몰 관리자, 사이트 관리자(상품 등록)
  createProductExe: async function (products) {
    let conn;
    try {
      conn = await db.getPoolConnection();
      let queryString =
        "insert into product (mall_name, product_name, price, detail) " +
        "value (" +
        "NULLIF(" +
        conn.escape(products["mall_name"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(products["product_name"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(products["price"]) +
        ", null), " +
        "NULLIF(" +
        conn.escape(products["detail"]) +
        ", null)" +
        ")";
      const result = await conn.query(queryString);
      console.log("query statement: " + queryString);
      return result;
    } catch (err) {
      console.log("createProduct Error: " + err);
      throw err;
    } finally {
      if (conn) {
        await db.endPoolConnection(conn);
      }
    }
  },
};
