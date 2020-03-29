import React from 'react';
import { formatPrice } from "../Data/DataProductos";
import { CardDeck, Card, Button } from "react-bootstrap";
import './Store.css';

const Store = (props) => {
    const { fbData } = props;
    const { Productos } = fbData;
    const productos = Productos;
    let productosToArray = [];
    //console.log(Productos);

    /*const [productos, setProductos] = useState(null)
    let productosToArray = [];
    useEffect(() => {

        firebase.database().ref('/Productos').on('value', snapshot => {
            setProductos(snapshot.val());

        });
    }, []);*/

    if (productos) {
        Object.keys(productos).map((key, i) => {
            productosToArray[i] = productos[key]

        })

        return (
            <div className="p-3">
                <CardDeck>
                    {
                        productosToArray.map((producto, i) => {
                            return (
                                <div key={i}>
                                    <Card border="light" style={{ width: '18rem' }}>
                                        <Card.Img src={producto.img} variant="top" />
                                        <Card.Body>
                                            <Card.Title>{producto.nombre}</Card.Title>
                                            <Card.Text>
                                                {producto.subcategoria}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">{formatPrice(producto.precio)}</small>
                                            <br />
                                            <Button title="Comprar" variant="dark">
                                                Agregar
                                    </Button>
                                        </Card.Footer>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </CardDeck>
            </div>
        )
    } else {
        return (
            <div>
                <h3>Cargando...</h3>
            </div>
        )
    }
}

export default Store;

