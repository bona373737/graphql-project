- [ ] 로그인,계정등록 입력값 유효성검사
- [ ] 예외처리
- [ ] 
### React Router V6 -> V5
https://jforj.tistory.com/241   
yarn remove react-router-dom   
yarn add react-router-dom@5   
- 페이지이동 v6:Link to="절대경로,상대경로" -> v5: Link to="절대경로"
- 페이지이동 v6:useNavigate -> v5:useHistory
- 파라미터확인 v6:useParams -> v5:useRouteMatch
- 리다이렉트 v6:<Navigate to='/home' replace /> -> v5:<Redirect to='/home' />

### useQuery,useMutaion 실행시점
Whenever this component renders, the useQuery hook automatically executes our query    
and returns a result object containing loading, error, and data properties:

### Authentication vs Authorization
- https://baek.dev/post/24/
- https://escape.tech/blog/9-graphql-security-best-practices/

- https://www.digitalocean.com/community/tutorials/react-simple-authorization

## history객체, location 객체

## mariadb 데이터 타입 설정
count(*)... 집계함수 결과값 데이터형태 : BigInt

설정변경
const pool = mariadb.createPool({
  bigIntAsNumber: true,


