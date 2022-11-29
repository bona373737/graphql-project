import { Switch,Route,Link } from 'react-router-dom';
import DashBoard from "../components/DashBoard";
import CorpManager from "../components/CorpManager";
import UserManager from "../components/UserManager";
import DeviceManager from "../components/DeviceManager";

const contents =()=>{
    return(
        <Switch>
            <Route path='/main/dashboard' component={DashBoard}/>
            <Route path='/main/corpmanager' component={CorpManager} />
            <Route path='/main/usermanager' component={UserManager} />
            <Route path='/main/devicemanager' component={DeviceManager}/>
        </Switch>
    )
};
export default contents;