import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { LogOut } from '../../../config/firebase';
import sideNavStyles from './SideNav.module.scss';
import MenuBtn from './MenuBtn';

const SideNav = (props) => {
    const uid = props.props.uid
    const user_type = props.props.type;


    const [menuBtn, setmenuBtn] = useState({ isOpen: false });
    const toggle = () => {
        setmenuBtn({ isOpen: !menuBtn.isOpen });
    }

    return (
        <nav className={sideNavStyles.navWrapper}>
            <div className={sideNavStyles.logo}>
                <NavLink to={`/Dashboard/${uid}`}>
                    <img className={sideNavStyles.logo} alt="logoweb" src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Logos%2FLogoweb.png?alt=media&token=55c61595-d099-4356-9fae-9c9bae89737c" />
                </NavLink>
            </div>
            <span onClick={toggle} className={sideNavStyles.menu}>
                <MenuBtn isOpen={menuBtn.isOpen} />
            </span>
            <ul className={sideNavStyles.nav}>
                <NavLink to={`/Dashboard/${uid}/profile/`}>
                    <li>
                        <i className="fas fa-user fa-fw"></i>
                        Perfil
                    </li>
                </NavLink>
                {
                    user_type === 'client' ? (
                        <NavLink to={`/Dashboard/${uid}/pedidos`}>
                            <li>
                                <i className="fas fa-shopping-bag fa-fw"></i>
                                Pedidos
                            </li>
                        </NavLink>
                    )
                        :
                        (
                            <>
                                <NavLink to={`/Dashboard/${uid}/Slider`}>
                                    <li>
                                        <i className="far fa-image fa-fw" />
                                            Slider
                                    </li>
                                </NavLink>
                                <NavLink to={`/Dashboard/${uid}/Blog`}>
                                    <li>
                                        <i className="fas fa-pencil-alt fa-fw" />
                                             Blog
                                     </li>
                                </NavLink>
                                <NavLink to={`/Dashboard/${uid}/Agenda`}>
                                    <li>
                                        <i className="fas fa-calendar-alt fa-fw"></i>
                                            Agenda
                                    </li>
                                </NavLink>
                                <NavLink to={`/Dashboard/${uid}/Productos`}>
                                    <li>
                                        <i className="fas fa-shopping-cart fa-fw"></i>
                                            Productos
                                    </li>
                                </NavLink>
                                <NavLink to={`/Dashboard/${uid}/Categorias`}>
                                    <li>
                                        <i className="fas fa-project-diagram fa-fw"></i>
                                            Categorías
                                    </li>
                                </NavLink>
                                <NavLink to={`/Dashboard/${uid}/Ordenes`}>
                                    <li>
                                        <i className="fas fa-box-open fa-fw"></i>
                                            Ordenes
                                    </li>
                                </NavLink>
                            </>
                        )
                }

                <li onClick={() => LogOut()}>
                    <i className="fas fa-sign-out-alt fa-fw"></i>
                    Salir
                </li>
            </ul>
        </nav>
    )
}

export default SideNav;