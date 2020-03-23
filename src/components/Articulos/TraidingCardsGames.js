import React from "react";
import Image from "react-bootstrap/Image";
import Cards from "../Cards/Cards";

const JuegosDeCartas = () => {
  return (
    <div>
      <Image
        className="p-3"
        title="Juegos de Cartas"
        src="img/banners/BannerTCG.png"
        fluid
      />
      <Cards />
      <Image
        className="p-3"
        title="Magic The Gathering"
        src="img/banners/BannerMTG.png"
        fluid
      />
      <Cards />
      <Image
        className="p-3"
        title="Yu-gi-Ho!"
        src="img/banners/BannerYugioh.png"
        fluid
      />
      <Cards />
      <Image
        className="p-3"
        title="Mitos y Leyendas"
        src="img/banners/BannerMyL.png"
        fluid
      />
      <Cards />
      <Image
        className="p-3"
        title="Pokemon"
        src="img/banners/BannerPokemon.png"
        fluid
      />
      <Cards />
      <Image
        className="p-3"
        title="NetRunner"
        src="img/banners/BannerNetRunner.png"
        fluid
      />
      <Cards />
      <Image
        className="p-3"
        title="Varios"
        src="img/banners/BannerVarios.png"
        fluid
      />
      <Cards />
    </div>
  );
};

export default JuegosDeCartas;
