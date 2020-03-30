import React from "react";
import CarouselContainer from "../Carousel/Carousel";
import MainContent from "../../MainContent/MainContent";
import Store from "../../Store/Store";

const Home = (props) => {

  const { fbData } = props;
  let productosToArray = [];
  let categoriaProductos = [];
  //Convertimos el objeto entregado por firebase de productos en un array
  Object.keys(fbData).map((key, i) => {
    productosToArray[i] = fbData[key]
  });
  // Del array generado, extraemos todas las categorias de los productos
  productosToArray.forEach((producto, i) => {
    categoriaProductos[i] = producto.categoria;
  });
  // filtramos las categorias, para que no existan elementos repetidos dentro del array
  categoriaProductos = categoriaProductos.reduce((unique, item) =>
    unique.includes(item) ? unique : [...unique, item], []
  );

  return (
    <div>
      <CarouselContainer />
      <Store fbData={productosToArray} categoriasProductos={categoriaProductos} />
      <MainContent />
    </div>
  );
}

export default Home;
