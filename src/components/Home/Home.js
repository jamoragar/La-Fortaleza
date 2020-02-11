import React from 'react';
import { Header } from '../Header/Header';
import { NavBar } from '../Navbar/Navbar';
import { Content } from '../Content/Content';
import { Footer } from '../Footer/Footer';

const Home = () =>{
    return(
        <>    
        <Header/>   
        <NavBar/>
        <Content/>
        <Footer/>
        </>
    )
}

export default Home;


