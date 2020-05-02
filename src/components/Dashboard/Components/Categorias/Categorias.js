import React, { useEffect, useState } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import AgregarCategorias from './AgregarCategorias';
import AgregarSubCategorias from './AgregarSubCategorias';

const Categorias = () => {
    const columns = [
        {
            name: 'Foto',
            cell: row => <a href={row.banner} target="blank"><img src={row.banner} width='75' alt="..." /></a>,
            grow: 1,
        },
        {
            name: 'Nombre',
            selector: 'description',
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
                                <div style={{ cursor: 'pointer' }} onClick={() => /*deleteCategory(data)*/ console.log(`eliminando ${data.id}`)} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{ height: '20px' }} /></div>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];

    const [showModal, setShowModal] = useState(false);
    const [categorias, setCategorias] = useState([])
    let categoriasToArray = [];
    const handleShow = () => setShowModal(true);

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
        return (
            <div>
                <div className="row" >
                    <div className="col text-center">
                        <h1>Mantenedor De Categorias</h1>
                    </div>
                </div>
                <Button style={{ float: 'right' }} onClick={handleShow} variant="primary">
                    <i className="fas fa-tag fa-fw" />
                    Agregar Categoria
                </Button>
                <AgregarCategorias show={showModal} onHide={() => setShowModal(false)} />
                <Button style={{ float: 'right' }} onClick={handleShow} variant="primary">
                    <i className="fas fa-tag fa-fw" />
                    Agregar Subcategoria
                </Button>
                <AgregarSubCategorias show={showModal} onHide={() => setShowModal(false)} />
                <DataTable
                    title="Categorias"
                    columns={columns}
                    data={categoriasToArray}
                    persistTableHead
                />
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