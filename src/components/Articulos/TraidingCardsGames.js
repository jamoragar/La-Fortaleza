import React from "react";
import Image from "react-bootstrap/Image";

const JuegosDeCartas = () => {
  return (
    <div>
      <Image
        className="p-3"
        title="Juegos de Cartas"
        src="img/banners/BannerTCG.png"
        fluid
      />
      <Image
        className="p-3"
        title="Magic The Gathering"
        src="img/banners/BannerMTG.png"
        fluid
      />
      <Image
        className="p-3"
        title="Yu-gi-Ho!"
        src="img/banners/BannerYugioh.png"
        fluid
      />
      <Image
        className="p-3"
        title="Mitos y Leyendas"
        src="img/banners/BannerMyL.png"
        fluid
      />
      <Image
        className="p-3"
        title="Pokemon"
        src="img/banners/BannerPokemon.png"
        fluid
      />
      <Image
        className="p-3"
        title="NetRunner"
        src="img/banners/BannerNetRunner.png"
        fluid
      />
      <Image
        className="p-3"
        title="Varios"
        src="img/banners/BannerVarios.png"
        fluid
      />
    </div>
  );
};

export default JuegosDeCartas;
