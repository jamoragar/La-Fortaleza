import React from 'react';
import SideNav from './SideNav/SideNav';
import Main from './Main/Main';

import dashboardStyles from './Dashboard.module.scss'

const Dashboard = () => {
    return (
        <div style={{ overflow: "hidden", height: "100vh", width: "100vw", position: "relative", marginTop: "5%" }} >
            <div className={dashboardStyles.container}>
                <div className={dashboardStyles.section}>
                    <SideNav />
                    <Main />
                </div>
            </div>
        </div>
    )
}

export default Dashboard;