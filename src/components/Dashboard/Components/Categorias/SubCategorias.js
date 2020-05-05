import React, { useState } from 'react';
import firebase from '../../../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import AgregarSubCategorias from './AgregarSubCategorias';

const Categorias = (props) => {
    const columns = [
        {
            name: 'Foto',
            cell: row => <a href={row.img} target="blank"><img src={row.img} width='100' alt="..." /></a>,
            grow: 1,
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
            },
        },
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
            grow: 2,
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
            },

        },
        {
            name: 'Nombre',
            selector: 'description',
            sortable: true,
            grow: 2,
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
            },

        },
        {
            name: 'Path',
            selector: 'path',
            sortable: true,
            grow: 2,
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
            },

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
                                <div style={{ cursor: 'pointer' }} onClick={() => (opcion(true)) ? deletesubCategory(data) : null} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{ height: '20px' }} /></div>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },
            style: {
                backgroundColor: 'rgba(187, 204, 221, 1)',
            },

        }
    ];

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);

    const catdata = props;
    let catDataToArray = [];
    let subCat = [];
    const opcion = () => window.confirm('Esta seguro que desea eliminar esta subcategoria?');

    const deletesubCategory = (subcategory) => {
        const catdata = props;
        let category = [];

        Object.keys(catdata).forEach((key, i) => {
            category[i] = catdata[key]
        });

        let categoryId = category[1].id;

        const ref = firebase.storage().ref(`/IMG/Categorias/subcategorias/${subcategory.description}`);

        firebase.database().ref(`/Category/${categoryId}/subCat/${subcategory.id}`).remove().then(() => {
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

    if (catdata && catdata.data.subCat) {

        Object.keys(catdata).forEach((key, i) => {
            catDataToArray[i] = catdata[key]
        });
        let subCaData = catDataToArray[1].subCat;

        Object.keys(subCaData).forEach((key, i) => {
            subCat[i] = subCaData[key]
        });

        return (
            <div>
                <div className="row">
                    <div className="col text-center">
                        <Button style={{ float: 'right', marginRight: '1rem', marginTop: '3rem', width: '100' }} onClick={handleShow} variant="primary">
                            <i className="fas fa-tag fa-fw" />
                                Agregar SubCategoria
                        </Button>
                        <AgregarSubCategorias show={showModal} onHide={() => setShowModal(false)} catinfo={catdata.data} />
                    </div>
                </div>
                <div className="row">
                    <div className="col" style={{ marginBottom: "5rem" }}>
                        <DataTable
                            title='Subcategorias'
                            columns={columns}
                            data={subCat}
                            fixedHeader
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div>
                <div className="row">
                    <div className="col text-center">
                        <Button style={{ float: 'right', marginRight: '1rem', marginTop: '3rem', width: '100' }} onClick={handleShow} variant="primary">
                            <i className="fas fa-tag fa-fw" />
                                Agregar SubCategoria
                        </Button>
                        <AgregarSubCategorias show={showModal} onHide={() => setShowModal(false)} catinfo={catdata.data} />
                    </div>
                </div>
                <div className="col text-center">
                    <h4 style={{ marginBottom: "3rem", marginTop: "2rem" }}>No Hay subCategorias para mostrar.</h4>
                </div>
            </div>
        )
    }
}

export default Categorias;