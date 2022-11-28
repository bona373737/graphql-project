import React from "react";
import Nav from "../components/Nav/Nav";
import Sliders from "../components/Sliders";
import styled from "@emotion/styled/macro";
import Product from "../components/Product";
import { useQuery } from "@apollo/client";
import { GET_ADMIN } from "../graphql/query";
import { useHistory, useLocation } from "react-router-dom";
import MallProduct from "../components/MallProduct";

const Margin = styled.div`
  margin-top: 7vh;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin: 50px 0 0 50px;
`;

function Home() {
  // login에서 id state받아옴
  const location = useLocation();
  const history = useHistory();

  const { data } = useQuery(GET_ADMIN, {
    variables: {
      getAdminId: location.state,
    },
  });

  return (
    <>
      {location && data ? (
        <>
          <Nav userData={data} />
          <Margin>
            {data.getAdmin[0].admin ? (
              data.getAdmin[0].admin === 2 ? (
                history.push({
                  pathname: "/manage",
                  state: data,
                })
              ) : (
                <div style={{ paddingTop: "1px" }}>
                  <Title>{data.getAdmin[0].nick_name} 상품</Title>
                  <MallProduct userData={data} />
                </div>
              )
            ) : (
              <Sliders />
            )}
            {data.getAdmin[0].admin === 2 ? (
              console.log("관리자")
            ) : (
              <>
                <Title>전체 상품</Title>
                <Product userData={data} />
              </>
            )}
          </Margin>
        </>
      ) : (
        <>
          <Nav />
          <Margin>
            <Sliders />
            <Title>전체 상품</Title>
            <Product />
          </Margin>
        </>
      )}
    </>
  );
}

export default Home;
