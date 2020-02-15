import React from 'react';
import CarouselContainer from '../Carousel/Carousel';
import MainContent from '../MainContent/MainContent';
import Cards from '../Cards/Cards';

const Home = () =>{
    return(
        <div>  
            <CarouselContainer />
            <Cards/>
            <MainContent />         
        </div>
    )
}

export default Home;


