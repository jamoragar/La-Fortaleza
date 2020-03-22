import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import MainContent from "../MainContent/MainContent";
import Cards from "../Cards/Cards";
import Image from "react-bootstrap/Image";

const Home = () => {
  return (
    <div>
      <CarouselContainer />
      <Image className="p-3" src="img/banners/BannerBg.png" fluid />
      <Cards />
      <MainContent />
    </div>
  );
};

export default Home;
