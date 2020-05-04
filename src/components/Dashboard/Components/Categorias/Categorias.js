import React, { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip, Card, Accordion, Row, Col } from 'react-bootstrap';
import AgregarCategorias from './AgregarCategorias';
import AgregarSubCategorias from './AgregarSubCategorias';
import SubCategorias from './SubCategorias';

const Categorias = () => {
    const columns = [
        {
            name: 'Foto',
            cell: row => <a href={row.banner} target="blank"><img src={row.banner} width='75' alt="..." /></a>,
            grow: 1,
        },
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
            grow: 2,

        },
        {
            name: 'Nombre',
            selector: 'description',
            sortable: true,
            grow: 2,

        },
        {
            name: 'Path',
            selector: 'path',
            sortable: true,
            grow: 2,

        },
        {
            name: 'Control',
            button: true,
            cell: (data) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger key={'eliminar'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Eliminar</strong></Tooltip>
                                }
                            >
                                <div style={{ cursor: 'pointer' }} onClick={() => (opcion(true)) ? deleteCategory(data) : null} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{ height: '20px' }} /></div>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];

    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);
    const [categorias, setCategorias] = useState([])
    let categoriasToArray = [];
    const handleShow1 = () => setShowModal1(true);
    const handleShow2 = () => setShowModal2(true);
    const opcion = () => window.confirm('Esta seguro que desea eliminar esta categoria?');

    useEffect(() => {
        firebase.database().ref('/Category').on('value', snapshot => {
            if (snapshot.val()) { setCategorias(snapshot.val()); }
        });
    }, []);

    const deleteCategory = (category) => {
        const ref = firebase.storage().ref(`/IMG/Categorias/categorias/${category.description}`);
        firebase.database().ref(`/Category/${category.id}`).remove().then(() => {
            ref.listAll().then((dir) => {
                dir.items.forEach(fileRef => {
                    deleteFile(ref.fullPath, fileRef.name)
                });
            })
        });
        const deleteFile = (pathToFile, fileName) => {
            const ref = firebase.storage().ref(pathToFile);
            const childRef = ref.child(fileName);
            childRef.delete()
        }
    }


    if (categorias || categorias.length >= 0) {

        Object.keys(categorias).forEach((key, i) => {
            categoriasToArray[i] = categorias[key]
        });

        const paginationOptions = { rowsPerPageText: 'Filas por página', rangeSeparatorText: 'de', selectAllRowsItem: true, selectAllRowsItemText: 'Todos' };

        return (
            <div>
                <div className="row" >
                    <div className="col text-center">
                        <h1>Mantenedor De Categorias</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col text-center">
                        <Button style={{ float: 'right', marginRight: '1rem', marginTop: '3rem', marginBottom: '2rem', width: '100' }} onClick={handleShow2} variant="primary">
                            <i className="fas fa-tag fa-fw" />
                                Agregar Categoria
                        </Button>
                        <AgregarCategorias show={showModal2} onHide={() => setShowModal2(false)} />
                        <Button style={{ float: 'right', marginRight: '1rem', marginTop: '3rem', marginBottom: '2rem', marginLeft: '2rem' }} onClick={handleShow1} variant="primary">
                            <i className="fas fa-tag fa-fw" />
                                Agregar Subcategoria
                        </Button>
                        <AgregarSubCategorias show={showModal1} onHide={() => setShowModal1(false)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        < DataTable
                            columns={columns}
                            data={categoriasToArray}
                            persistTableHead
                            fixedHeader
                            fixedHeaderScrollHeight="500px"
                            noHeader
                            pagination
                            paginationComponentOptions={paginationOptions}
                            expandableRows
                            expandableRowsComponent={<SubCategorias catData={categoriasToArray.id} />}
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <>
                <Spinner animation="grow" variant="primary" />
                <Spinner animation="grow" variant="secondary" />
                <Spinner animation="grow" variant="success" />
                <Spinner animation="grow" variant="danger" />
                <Spinner animation="grow" variant="warning" />
                <Spinner animation="grow" variant="info" />
                <Spinner animation="grow" variant="light" />
                <Spinner animation="grow" variant="dark" />
            </>
        )
    }
}

export default Categorias;