import { Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Home from "./pages/Home";
import Main from './pages/Main';


function App() {

  return (
    <div>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/main' component={Main}/>
      </Switch>
    </div>
  ); 
}

export default App;
