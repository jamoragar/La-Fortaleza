import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import MainContent from "../../MainContent/MainContent";
import Store from "../../Store/Store";
import Image from "react-bootstrap/Image";

const Home = (props) => {
  const { fbData } = props;
  //console.log(fbData);
  return (
    <div>
      <CarouselContainer />
      <a href="/Preventa">
        <Image
          className="p-3"
          title="Preventa"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerPreVenta.png?alt=media&token=466dc91e-a82a-4481-b0bb-1f8730cadd9a"
          fluid
        />
      </a>
      <Store fbData={fbData} />
      <a href="/BoardingGames">
        <Image
          className="p-3"
          title="Juegos de Mesa"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerBG.png?alt=media&token=04dc0441-f06a-408c-8f75-1df61cab4feb"
          fluid
        />
      </a>
      <a href="/RolGames">
        <Image
          className="p-3"
          title="Juegos de Rol"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerRG.png?alt=media&token=a62580f5-a9a3-48c1-9fe1-b80194c0b5f7"
          fluid
        />
      </a>
      <a href="/traidingCardsGames">
        <Image
          className="p-3"
          title="Juegos de Cartas"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerTCG.png?alt=media&token=2164feb1-1e8c-414d-bc0a-bfc62f1d9cf4"
          fluid
        />
      </a>
      <a href="/ModelosEscala">
        <Image
          className="p-3"
          title="Modelos a Escala"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerME.png?alt=media&token=a34c528b-514b-45cd-bed2-9658059466f9"
          fluid
        />
      </a>
      <a href="/Comics">
        <Image
          className="p-3"
          title="Comics"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerComics.png?alt=media&token=78310fb7-c1f3-4a44-ae1b-b26bca063d42"
          fluid
        />
      </a>
      <a href="/X-Wings">
        <Image
          className="p-3"
          title="X-Wings"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerX-Wings.png?alt=media&token=9df09f6a-470b-464c-8715-109294e0f6e0"
          fluid
        />
      </a>
      <a href="/Accesorios">
        <Image
          className="p-3"
          title="Accesorios"
          src="https://firebasestorage.googleapis.com/v0/b/la-fortaleza-18fbf.appspot.com/o/Banners%2FCategorias%2FBannerAccesorios.png?alt=media&token=c5f8f730-e879-445e-b003-c36dc04b460f"
          fluid
        />
      </a>
      <MainContent />
    </div >
  );
}
export default Home;
