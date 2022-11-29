
import { Link } from 'react-router-dom';

import {useQuery} from '@apollo/client';
import {GET_LOGINMEMBER} from '../graphql/query';

const LoginPage=()=>{

  //Whenever this component renders, the useQuery hook automatically executes our query 
  //and returns a result object containing loading, error, and data properties:
  const {data} = useQuery(GET_LOGINMEMBER,{
    variables:{
      loginMemberId: "mimi123",
      password: "password"
    }
  })

    return(
        <div>
            <p>{JSON.stringify(data)}</p>
            <Link to="/main">로그인 후 Main페이지로 이동</Link>
        </div>
    )
}
export default LoginPage;