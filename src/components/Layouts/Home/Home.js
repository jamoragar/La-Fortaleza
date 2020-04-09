import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import Store from "../../Store/Store";
import TableInfo from "../TableInfo/TableInfo";


const Home = (props) => {
  const { fbData, categoriasProductos, setArticulo, setAddCart } = props;

  return (
    <div className="container-fluid">
      <CarouselContainer />
      <TableInfo />
      <Store setAddCart={setAddCart} setArticulo={setArticulo} fbData={fbData} categoriasProductos={categoriasProductos} />
    </div>
  );
}

export default Home;
