import React, {useState, useEffect} from "react";
import CarouselContainer from "../Carousel/Carousel";
import Store from "../../Store/Store";
import TableInfo from "../TableInfo/TableInfo";
import firebase from '../../../config/firebase';


const Home = (props) => {
  const [fbData, setFbData] = useState(null);
  let productosToArray = [];
  let categoriaProductos = [];

  useEffect(() => {
    firebase.database().ref('/Productos').on('value', snapshot => {
      setFbData(snapshot.val());
    });
  }, []);
  if(fbData){
    //Convertimos el objeto entregado por firebase de productos en un array
    Object.keys(fbData).forEach((key, i) => {
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
      <div className="container-fluid">
        <CarouselContainer />
        <TableInfo />
        <Store fbData={productosToArray} categoriasProductos={categoriaProductos} />
      </div>
    );
  }
  else{
    return(
      <h1>
        Loading...
      </h1>
    )
  }
}

export default Home;
