import React from "react";
import Image from "react-bootstrap/Image";

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
        <Image
          className="p-3"
          title="Ugears"
          src="img/banners/BannerUgears.png"
          fluid
        />
      </a>
    </div>
  );
};

export default ModelosEscala;
