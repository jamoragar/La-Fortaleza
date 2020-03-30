import React from 'react';
import { formatPrice } from "../Data/DataProductos";
import { CardDeck, Card, Button } from "react-bootstrap";
import './Store.css';

const Store = (props) => {
    const { fbData, categorias } = props;
    
    //console.log(Productos);

    /*const [productos, setProductos] = useState(null)
    let productosToArray = [];
    useEffect(() => {

        firebase.database().ref('/Productos').on('value', snapshot => {
            setProductos(snapshot.val());

        });
    }, []);*/

    if (fbData) {
        return(
            <div>
            {categorias.map((categoria, i)=>{
                return(
                    <div>
                        <h1 key={i}>{categoria}</h1>
                            <div className="p-3">
                                <CardDeck>
                                    {fbData.map((producto, j) => {
                                        return producto.categoria == categoria ? (
                                            <div key={j}>
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
                                        :
                                        null
                                    })}
                                </CardDeck>
                            </div>
                        </div>
                    )
                })
            }
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

