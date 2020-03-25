import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import MainContent from "../../MainContent/MainContent";
import Store from "../../Store/Store";
import Image from "react-bootstrap/Image";

const Home = () => {
  return (
    <div>
      <CarouselContainer />
      <a href="/Preventa">
        <Image
          className="p-3"
          title="Juegos de Mesa"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerBG.png?alt=media&token=04dc0441-f06a-408c-8f75-1df61cab4feb"
          fluid
        />
        <Store />
        <Image
          className="p-3"
          title="Juegos de Mesa"
          src="img/banners/BannerBg.png"
          fluid
        />
      </a>
      <a href="/RolGames">
        <Image
          className="p-3"
          title="Juegos de Rol"
          src="img/banners/BannerRG.png"
          fluid
        />
      </a>
      <a href="/traidingCardsGames">
        <Image
          className="p-3"
          title="Juegos de Cartas"
          src="img/banners/BannerTCG.png"
          fluid
        />
      </a>
      <a href="/ModelosEscala">
        <Image
          className="p-3"
          title="Modelos a Escala"
          src="img/banners/BannerME.png"
          fluid
        />
      </a>
      <a href="/Comics">
        <Image
          className="p-3"
          title="Comics"
          src="img/banners/BannerComics.png"
          fluid
        />
      </a>
      <a href="/X-Wings">
        <Image
          className="p-3"
          title="X-Wings"
          src="img/banners/BannerX-Wings.png"
          fluid
        />
      </a>
      <a href="/Accesorios">
        <Image
          className="p-3"
          title="Accesorios"
          src="img/banners/BannerAccesorios.png"
          fluid
        />
      </a>
      <MainContent />
    </div >
  );
};

export default Home;
