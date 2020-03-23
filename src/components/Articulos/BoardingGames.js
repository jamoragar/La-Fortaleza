import React from "react";
import Image from "react-bootstrap/Image";

const BoardingGames = () => {
  return (
    <a href="/BoardingGames">
      <Image
        className="p-3"
        title="Juegos de Mesa"
        src="img/banners/BannerBg.png"
        fluid
      />
    </a>
  );
};

export default BoardingGames;
