import React from "react";
import ProductInfo from "../components/ProductInfo";
import styled from "@emotion/styled/macro";

const Margin = styled.div`
  margin-top: 7vh;
`;

function ProductInfoPage() {
  return (
    <Margin>
      <ProductInfo />
    </Margin>
  );
}

export default ProductInfoPage;
