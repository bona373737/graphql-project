import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Nav from "../components/Nav/Nav";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_PRODUCT,
  GET_PROFIT_PRODUCT,
  GET_SHOWPRODUCT,
  GET_USER_COUNT,
} from "../graphql/query";

const Base = styled("div")({
  backgroundColor: "#f5f5f5",
  width: "100%",
  height: "100%",
  paddingTop: "5%",
});

const Container = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const Box = styled("div")({
  display: "inline-block",
  margin: "30px",
  width: "auto",
  padding: "0 20px",
  height: "150px",
  backgroundColor: "#fff",
  boxShadow: "1px 1px 1px 1px #ccc",
  borderRadius: "10px",
});

const Title = styled("div")({
  padding: "10px 30px",
  textAlign: "center",
});

const Score = styled("div")({
  fontSize: "50px",
  fontWeight: "bold",
  textAlign: "center",
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  objectFit: "cover",
});

const Section = styled("div")({
  height: "50px",
  backgroundColor: "#fff",
  boxShadow: "1px 1px 1px 1px #ccc",
  borderRadius: "10px",
  margin: "50px auto",
  width: "40%",
  fontSize: "25px",
  fontWeight: "bold",
  paddingTop: "15px",
  textAlign: "center",
});

const GridContainer = styled("div")({
  width: "100%",
  paddingBottom: "20%",
});

export default function Manage() {
  const location = useLocation();

  const { data } = useQuery(GET_SHOWPRODUCT);

  const profit = useQuery(GET_PROFIT_PRODUCT);

  const user = useQuery(GET_USER_COUNT);

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  React.useEffect(() => {}, []);

  if (profit) {
    console.log("user", user);
  }

  // const dddddddddddd = await deleteProduct({
  //   variables,
  //   onCompleted: (d) => {

  //   }
  // })
  return (
    <>
      {data ? (
        <>
          <Nav userData={location.state} />
          <Base>
            {!profit.loading && !user.loading ? (
              <Container>
                <Box>
                  <Title>총 상품 수</Title>
                  <Score>
                    {profit.data.getAllProductProfit[0].total_count}개
                  </Score>
                </Box>
                <Box>
                  <Title>수익</Title>
                  <Score>
                    {profit.data.getAllProductProfit[0].total_profit}원
                  </Score>
                </Box>
                <Box>
                  <Title>사용자 수</Title>
                  <Score>{user.data.getCountUser[0].user_count}명</Score>
                </Box>
              </Container>
            ) : (
              console.log("로딩")
            )}
            <Section>각 상품 수익</Section>
            <GridContainer>
              {data.getShowProduct.map((data) => (
                <Paper
                  key={data.id}
                  style={{ display: "inline-block" }}
                  sx={{
                    p: 2,
                    marginTop: 4,
                    marginLeft: 4,
                    maxWidth: 200,
                    flexGrow: 2,
                    backgroundColor: (theme) =>
                      theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item>
                      <ButtonBase sx={{ width: 200, height: 150 }}>
                        <Img
                          width="100%"
                          alt="complex"
                          src={process.env.REACT_APP_ROOT_URL + data.img_url}
                        />
                      </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                      <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                          <Typography
                            gutterBottom
                            variant="subtitle1"
                            component="div"
                          >
                            {data.product_name}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            {data.mall_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {data.id}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          onClick={() => {
                            deleteProduct({
                              variables: { adminProductDeleteId: data.id },
                            });
                            window.location.reload();
                          }}
                        >
                          <Typography
                            sx={{ cursor: "pointer" }}
                            variant="body2"
                          >
                            삭제
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1" component="div">
                          {data.profit}원
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </GridContainer>
          </Base>
        </>
      ) : (
        console.log("로딩")
      )}
    </>
  );
}
