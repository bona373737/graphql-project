import { Switch,Route } from 'react-router-dom';
import DashBoard from "../components/DashBoard";
import CorpManager from "../components/CorpManager";
import UserManager from "../components/UserManager";
import DeviceManager from "../components/DeviceManager";
import styled from 'styled-components';

const ContentsContainer =styled.div`
    height: 100%;

`;

const Contents =()=>{
    return(
        <ContentsContainer id='contents'>
            <Switch>
                <Route path='/main/dashboard' component={DashBoard}/>
                <Route path='/main/corpmanager' component={CorpManager} />
                <Route path='/main/usermanager' component={UserManager} />
                <Route path='/main/devicemanager' component={DeviceManager}/>
            </Switch>
        </ContentsContainer>
    )
};
export default Contents;