import React from "react";
import styled from "@emotion/styled/macro";
import Text from "../elements/Text";
import Grid from "../elements/Grid";

const TextWrapper = (props) => {
  const { size, prd_name, prd_sum, originPrice } = props;

  const style = {
    size: size,
  };

  return (
    <React.Fragment>
      <Price {...style}>
        <Grid padding="30px 24px">
          <Text size="2em" bold margin="0 0 6px">
            {prd_name}
          </Text>
          <Text color="#A1A1A1" margin="8px 0px 24px">
            {prd_sum}
          </Text>

          <React.Fragment>
            <Text margin="0" size="1.85em" bold>
              {originPrice}
              <span style={{ fontSize: "0.6em" }}>원</span>
            </Text>
          </React.Fragment>
        </Grid>
      </Price>
    </React.Fragment>
  );
};

const Price = styled.div`
  font-size: ${(props) => props.size};
  color: #3b3b3b;
  width: 100%;
  top: 0px;
`;

export default TextWrapper;
