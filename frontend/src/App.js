////////////////////////  문제점  ////////////////////////////
// input value가 바뀔때마다 서버로 데이터 보내줌(onChange 문제)
// header에 토큰값 안담아줌(담아서 어떻게 활용해야 할 지 모름)
// 첫 랜더링시 에러(Home 컴포넌트에서 id값을 받지않아서)
// 계속 Link를 통해 userAdmin 값 넘겨줌 (redux 사용해야 하나)
// 상품 등록시 새로고침 해야 홈 화면에 나옴
// 상품 클릭 후 Nav바의 INFOFLA 클릭 시 로그아웃됨(Nav 컴포넌트 에서 localStorage.getItem("login-token") && userData 때문에 -> 이것도 redux 사용하면 해결 될듯?)

//////////////////////    해야 할 것 //////////////////////
// 운영관리(총 상품수, 수익, 사용자 수) -> useQuery가 여러번 쓰여서 문제가 생김

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import ProductImageRegistionPage from "./pages/ProductImageRegistionPage";
import ProductInfoPage from "./pages/ProductInfoPage";
import ProductRegistionPage from "./pages/ProductRegistionPage";
import RegisterPage from "./pages/RegisterPage";
import UserInfoPage from "./pages/UserInfoPage";
import Manage from "./pages/Manage";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/userinfo" component={UserInfoPage} />
        <Route exact path="/productinfo/:id" component={ProductInfoPage} />
        <Route
          exact
          path="/productregistion"
          component={ProductRegistionPage}
        />
        <Route
          exact
          path="/productimageregistion"
          component={ProductImageRegistionPage}
        />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/manage" component={Manage} />
      </Switch>
    </Router>
  );
}

export default App;
