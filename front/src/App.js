import {useQuery, gql} from '@apollo/client';
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Home from "./pages/Home";
import Main from './pages/Main';


function App() {

  return (
    <div>
      <Routes>
        <Route path='/' exact element={<Home/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/main' element={<Main/>}/>
      </Routes>
    </div>
  ); 
}

export default App;
