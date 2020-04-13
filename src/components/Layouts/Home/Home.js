import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import Store from "../../Store/Store";
import TableInfo from "../TableInfo/TableInfo";


const Home = (props) => {
  const { fbData, categoriasProductos, orders, openCart } = props;

  return (
    <div className="container-fluid">
      <CarouselContainer />
      <TableInfo />
      <Store openCart={openCart} orders={orders} fbData={fbData} categoriasProductos={categoriasProductos} />
    </div>
  );
}

export default Home;
