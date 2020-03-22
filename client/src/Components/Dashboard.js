import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';

function Dashboard(props){
    const user = getUser();

    // event handler for logout button
    const handleLogout = () =>{
        removeUserSession();
        props.history.push('/login');
    }

    return(
        <div>
            Welcome User!<br /><br/>
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
}

export default Dashboard;