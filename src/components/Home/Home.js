import React from 'react';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Carousel from '../Carousel/Carousel';
import MainContent from '../MainContent/MainContent';
import Footer from '../Footer/Footer';



const Home = () =>{
    return(
        <div>  
            <Header />
            <Navbar />
            <Carousel />
            <MainContent />
            <Footer />
         
        </div>
    )
}

export default Home;


