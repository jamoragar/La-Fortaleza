import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import TableInfo from "../TableInfo/TableInfo";
import Store from "../../Store/Store";

const Home = (props) => {
  const { fbData, categoriasProductos, fbSlider } = props;

  return (
    <div>
      <CarouselContainer fbSlider={fbSlider} />
      <TableInfo />
      <Store fbData={fbData} categoriasProductos={categoriasProductos} />
    </div>
  );
}

export default Home;
