import React from 'react';
import {Link} from 'react-router-dom';
import sideNavStyles from './SideNav.module.scss';

const SideNav = () =>{
    return(
        <nav className={sideNavStyles.navWrapper}>
            <div className={sideNavStyles.logo}>
                <Link to='/Dashboard'>
                    <h2>La Fortaleza</h2>
                </Link>
            </div>
            <ul className={sideNavStyles.nav}>
                <Link to='/Dashboard/Agenda'>
                    <li>
                        <i class="fas fa-calendar-alt fa-fw"></i>
                        Agenda
                    </li>
                </Link>
                <Link to='/Dashboard/Productos'>
                    <li>
                        <i class="fas fa-shopping-cart fa-fw"></i>
                        Productos
                    </li>
                </Link>
                <Link to='/Dashboard/Categorias'>
                    <li>
                        <i class="fas fa-project-diagram"></i>         
                        Categorías
                    </li>
                </Link>
                <Link to='/Dashboard/Ordenes'>
                    <li>
                        <i class="fas fa-box-open fa-fw"></i>
                        Ordenes
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default SideNav;