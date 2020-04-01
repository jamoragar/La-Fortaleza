import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import Store from "../../Store/Store";


const Home = (props) => {
  const { fbData, categoriasProductos } = props;

  return (
    <div>
      <CarouselContainer />
      <Store fbData={fbData} categoriasProductos={categoriasProductos} />
    </div>
  );
}

export default Home;
