import { Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Home from "./pages/Home";
import Main from './pages/Main';
import DashBoard from './components/DashBoard';
import CorpManager from './components/CorpManager';
import UserManager from './components/UserManager';
import DeviceManager from './components/DeviceManager';


function App() {

  return (
    <>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/main' component={Main}>
            {/* <Route path='/dashboard' component={DashBoard}/>
            <Route path='/corpmanager' component={CorpManager} />
            <Route path='/usermanager' component={UserManager} />
            <Route path='/devicemanager' component={DeviceManager}/> */}
        </Route>
      </Switch>
    </>
  ); 
}

export default App;
