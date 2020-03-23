import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import MainContent from "../MainContent/MainContent";
import Cards from "../Cards/Cards";
import Image from "react-bootstrap/Image";

const Home = () => {
  return (
    <div>
      <CarouselContainer />
      <a href="/Preventa">
        <Image
          className="p-3"
          title="Juegos de Mesa"
          src="img/banners/BannerPreventa.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/BoardingGames">
        <Image
          className="p-3"
          title="Juegos de Mesa"
          src="img/banners/BannerBg.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/RolGames">
        <Image
          className="p-3"
          title="Juegos de Rol"
          src="img/banners/BannerRG.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/traidingCardsGames">
        <Image
          className="p-3"
          title="Juegos de Cartas"
          src="img/banners/BannerTCG.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/ModelosEscala">
        <Image
          className="p-3"
          title="Modelos a Escala"
          src="img/banners/BannerME.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/Comics">
        <Image
          className="p-3"
          title="Comics"
          src="img/banners/BannerComics.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/X-Wings">
        <Image
          className="p-3"
          title="X-Wings"
          src="img/banners/BannerX-Wings.png"
          fluid
        />
      </a>
      <Cards />
      <a href="/Accesorios">
        <Image
          className="p-3"
          title="Accesorios"
          src="img/banners/BannerAccesorios.png"
          fluid
        />
      </a>
      <Cards />
      <MainContent />
    </div>
  );
};

export default Home;
