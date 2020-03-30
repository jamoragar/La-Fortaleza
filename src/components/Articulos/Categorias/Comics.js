import React from "react";
import Image from "react-bootstrap/Image";

const Comics = () => {
  return (
    <div>
      <a href="/Comics">
        <Image
          className="p-3"
          title="Comics"
          src="img/banners/BannerComics.png"
          fluid
        />
      </a>
    </div>
  );
};

export default Comics;
