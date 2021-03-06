
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import credentials from './credentials.json'
import firebase from '../../config/firebase';
import moment from 'moment';
import timezone from './timezone.json';
import { checkProductStock, updateProductStock, checkClientOrder } from './functions/FbFunctions';
import { sendEmail } from './functions/EnvioEmail';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const tableError = (tipo, orden_id, pedido_id) => {
    return (
        <>
            <br />
            <h1>{tipo} no encontrado</h1>
            <h5>Por favor comuniquese con nostros a la brevedad para dar seguimiento a su caso</h5>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Detalle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>ID de Operación</td>
                        <td>{orden_id}</td>
                    </tr>
                    <tr>
                        <td>ID de Pedido</td>
                        <td>{pedido_id}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Número de Contacto</td>
                        <td>61 2 371498</td>
                    </tr>
                    <tr>
                        <td>E-mail</td>
                        <td>Lafortalezapuq@gmail.com</td>
                    </tr>
                </tfoot>
            </Table>
        </>
    )
}

export const Exito = () => {
    //Tomamos el query string que retorna mercadolibre en la URL
    let search = window.location.search;
    let params = new URLSearchParams(search);
    const database = firebase.database();
    const collection_id = params.get('collection_id');//Número de operación
    const preference_id = params.get('preference_id');
    const payment_id = params.get('payment_id');
    const payment_method_id = params.get('payment_method_id');
    const [disableButton, setDisableButton] = useState(false);
    const [user, setUser] = useState(null);
    const [preference, setPreference] = useState(null);
    const [collection, setCollection] = useState(null);

    moment.tz.add(timezone.Punta_Arenas);// Establecemos zona horaria

    const validatingPreference = (id) => {
        fetch(`https://api.mercadopago.com/checkout/preferences/${id}?access_token=${credentials.access_token}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 404) {
                    setPreference(0)
                    console.log('preference')
                    alert(`Error. La preferencia con el identificador ${id} no fue encontrada.`);
                } else {
                    setPreference(data)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const validatingCollection = (id) => {
        fetch(`https://api.mercadopago.com/v1/payments/${id}?access_token=${credentials.access_token}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if (data.status === 404) {
                    setCollection(0)
                    console.log('collection')
                    alert(`Número de operación: ${id} no encontrado`);
                } else {
                    setCollection(data)
                    if(payment_method_id === 'webpay'){
                        console.log('llegamos')
                        validatingOrder(data.order.id)
                    }
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
    const validatingOrder = id => {
        fetch(`https://api.mercadopago.com//merchant_orders/${id}?access_token=${credentials.access_token}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                if(data.status === 400){
                    setPreference(0)
                    console.log('order')
                    alert(`Número de operación: ${id} no encontrado`);
                }else {
                    setPreference(data)
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    const exportPDF = () => {
        setDisableButton(true)
        const input = document.querySelector('#exitoTable');
        console.log(input)
        html2canvas(input).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'in');
            pdf.addImage(imgData, 'PNG', 0, 0, 9, 10);
            pdf.save('Comprobante_LaFortaleza.pdf');
        });
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged(fbUser => {
            if (fbUser) {
                setUser(fbUser)
                validatingCollection(collection_id?collection_id:payment_id);
                if(payment_method_id !== 'webpay'){
                    validatingPreference(preference_id)
                }
            } else {
                alert('No tiene una sesión activa');
                console.log('usuario sin sesión...');
            }
        })
    }, [firebase]);



    if (user && user.uid) {
        if (collection) {
            if (preference) {
                const id_pedido = preference.additional_info;
                const productos_pedido = preference.items;
                const clientOrderFb = checkClientOrder(user.uid, id_pedido);
                const formData = {
                    email: user.email,
                    nombre: user.displayName,
                    total: collection.transaction_amount,
                    id_pedido: collection.id,
                    productos: productos_pedido.map((producto) => {
                        return producto;
                    }),
                    fecha_creacion_pedido: moment(collection.date_created).locale('es').format('DD-MM-YYYY h:mm:ss a'),
                }
                clientOrderFb.then(data => {
                    console.log(data)
                    
                    //Cuando el cliente sea redireccionado a esta página por primera vez, se actualizará el estado de su pago en su pedido.
                    if (data && data.estado_pago === 'PENDIENTE') {
                        //"Limpiamos" el local storage, mejor dicho removemos la orden, ya que en este caso ya se pago. Pero para limpiar realmente, hay que usar la funcion clear()
                        localStorage.setItem('order', JSON.stringify({ order: [] }));
                        const aprovacion = {
                            estado_pago: 'APROBADO',
                            fecha_validacion_pago: moment().tz('America/Punta_Arenas').format('YYYY-MM-DD HH:mm'),
                            numero_orden: collection.id,
                            medio_pago: collection.payment_type_id,
                            payment_method_id: collection.payment_method_id,
                        };

                        database.ref(`/Users/${user.uid}/pedidos/${id_pedido}`).update(aprovacion).then(
                            database.ref(`/Pedidos/${id_pedido}/pedidoUsuario`).update(aprovacion).then(
                                productos_pedido.map((item, i) => {
                                    let product_stock = checkProductStock(item.id);
                                    if (item.id !== 'envueltoRegalo' && item.id !== 'envioGratuito') {
                                        product_stock.then(data => {
                                            let new_stock = data - item.quantity;
                                            updateProductStock(item.id, new_stock);
                                        })
                                    }
                                })
                            ).then(
                                sendEmail(formData),
                            )
                        );
                    }

                }).catch(err => console.log(err));

                return (
                    <div id='exitoTable'>
                        <Container>
                            <Row style={{ backgroundColor: '#28a745', marginTop: '3rem', padding: '2rem' }}>
                                <Col>
                                    <h2 style={{ textAlign: 'center', fontWeight: 'bolder', color: '#343a40' }}>Su Pago ha sido Exitoso.</h2>
                                </Col>
                            </Row>
                            <Row style={{ margin: ' 3rem 3rem 2rem 0' }}>
                                <Col>
                                    <h4 style={{ textAlign: 'initial', fontWeight: 'bolder', color: '#343a40' }}>Detalle de su Transacción :</h4>
                                </Col>
                            </Row>
                            {collection ? (
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Título</th>
                                            <th>Detalle</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>ID de Operación</td>
                                            <td>{collection.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha de creación de la orden</td>
                                            <td>{moment(collection.date_created).locale('es').format('DD-MM-YYYY h:mm:ss a')}</td>
                                        </tr>
                                        <tr>
                                            <td>Fecha Aprovación</td>
                                            <td>{moment(collection.date_approved).locale('es').format('DD-MM-YYYY h:mm:ss a')}</td>
                                        </tr>
                                        <tr>
                                            <td>ID de Pedido</td>
                                            <td>{preference.id}</td>
                                        </tr>
                                        <tr>
                                            <td>Metodo de Pago</td>
                                            <td>{collection.payment_type_id}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            )
                                :
                                <h5>Cargando...</h5>
                            }

                            <Row style={{ margin: ' 3rem 3rem 2rem 0' }}>
                                <Col>
                                    <h4 style={{ textAlign: 'initial', fontWeight: 'bolder', color: '#343a40' }}>Detalle de su Pedido :</h4>
                                </Col>
                            </Row>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Producto</th>
                                        <th>Categoria</th>
                                        <th>Cantidad</th>
                                        <th>Precio Unitario</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {preference ? preference.items.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.title}</td>
                                                <td>{item.description}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.unit_price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                                <td>{(item.unit_price * item.quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</td>
                                            </tr>
                                        )
                                    })
                                        :
                                        (
                                            <tr>
                                                <td>{'Cargando información del pedido...'}</td>
                                            </tr>
                                        )}
                                </tbody>
                            </Table>
                            <br />
                            <h2 style={{ textAlign: 'center' }}>Muchas gracias por su compra! Esperamos verlo pronto</h2>
                            <h5 style={{ textAlign: 'center' }}>Salidas a reparto dias Lunes - Miercoles - viernes entre 17:00 y 20:00hrs.</h5>
                            <br />
                            {/* TODO generar voucher para descargar */}
                            {/* <Button style={{ marginBottom: '1em' }} onClick={() => exportPDF()} variant="primary" block disabled={disableButton}><i className="fas fa-file-alt fa-fw" />Descargar Comprobante</Button> */}
                            <Link to='/'>
                                <Button style={{ marginBottom: '2em' }} variant="success" block><i className="fab fa-fort-awesome fa-fw" />Volver al Inicio</Button>
                            </Link>
                            {/* <Button onClick={testing}>Testing functions</Button> */}
                        </Container>
                    </div>
                )
            }else if(preference === 0){
                return (
                    tableError('Pedido', collection_id?collection_id:payment_id, preference_id)
                );
            }else {
                return (<h2>Cargando...</h2>);
            }
        } else if (collection === 0) {
            return (
                tableError('Operación', collection_id?collection_id:payment_id, preference_id)
            );
        } else {
            return (<h2>Cargando...</h2>);
        }
    } else {
        return (
            <>
                <h1>Sesión inactiva</h1>
                <h5>Esta sección es solo para usuarios que han sido redireccionados por MercadoPago y que cuentan con una sesión activa</h5>
            </>
        );
    }

}