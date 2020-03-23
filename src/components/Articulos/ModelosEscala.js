import React from "react";
import Image from "react-bootstrap/Image";
import Cards from "../Cards/Cards";

const ModelosEscala = () => {
  return (
    <div>
      <a href="/ModelosEscala">
        <Image
          className="p-3"
          title="Modelos a Escala"
          src="img/banners/BannerME.png"
          fluid
        />
        <Cards />
        <Image
          className="p-3"
          title="Ugears"
          src="img/banners/BannerUgears.png"
          fluid
        />
        <Cards />
      </a>
    </div>
  );
};

export default ModelosEscala;
