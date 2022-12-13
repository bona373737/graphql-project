import { Switch,Route } from 'react-router-dom';
import DashBoard from "../components/DashBoard";
import MemberManager from "../components/MemberManager";
import DeviceManager from "../components/DeviceManager";
import styled from 'styled-components';

const ContentsContainer =styled.div`
    width: 100%;
    border-radius: 20px 0 0 0 ;
    background-color: var(--subColor);
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Contents =()=>{
    return(
        <ContentsContainer id='contents'>
            <Switch>
                <Route path='/main/dashboard' component={DashBoard}/>
                <Route path='/main/membermanager' component={MemberManager} />
                <Route path='/main/devicemanager' component={DeviceManager}/>
            </Switch>
        </ContentsContainer>
    )
};
export default Contents;