import React from 'react';
import sideNavStyles from './SideNav.module.scss';

const SideNav = () =>{
    return(
        <nav className={sideNavStyles.navWrapper}>
            <div className={sideNavStyles.logo}>
                <h2>La Fortaleza</h2>
            </div>
            <ul className={sideNavStyles.nav}>
                <li>
                    <i class="fas fa-chart-bar fa-fw"></i>
                    Reportes
                </li>
                <li>
                    <i class="fas fa-shopping-cart fa-fw"></i>
                    Productos
                </li>
                <li>
                    <i class="fas fa-calendar-alt fa-fw"></i>
                    Eventos
                </li>
            </ul>
        </nav>
    )
}

export default SideNav;