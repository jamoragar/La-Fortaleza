import React from "react";
import Image from "react-bootstrap/Image";

const Xwings = () => {
  return (
    <div>
      <a href="/X-Wings">
        <Image
          className="p-3"
          title="X-Wings"
          src="img/banners/BannerX-Wings.png"
          fluid
        />
      </a>
    </div>
  );
};

export default Xwings;
