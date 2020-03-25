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
                    <i class="fas fa-calendar-alt fa-fw"></i>
                    Agenda
                </li>
                <li>
                    <i class="fas fa-shopping-cart fa-fw"></i>
                    Productos
                </li>
                <li>
                    <i class="fas fa-project-diagram"></i>         
                    Categorias
                </li>
                <li>
                    <i class="fas fa-box-open fa-fw"></i>
                    Ordenes
                </li>
            </ul>
        </nav>
    )
}

export default SideNav;