import React from 'react';
import { Spinner } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip, Card, Accordion, Row, Col } from 'react-bootstrap';

const Categorias = (props) => {
    const columns = [
        {
            name: 'Foto',
            cell: row => <a href={row.img} target="blank"><img src={row.img} width='75' alt="..." /></a>,
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
                                <div style={{ cursor: 'pointer' }} onClick={() => (opcion(true)) ? deletesubCategory(data) : null} className="text-danger"><i className="fa fa-fw fa-trash fa-lg" style={{ height: '20px' }} /></div>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];
    const catData = props;
    let catDataToArray = [];
    let subCat = [];
    const opcion = () => window.confirm('Esta seguro que desea eliminar esta subcategoria?');

    const deletesubCategory = (subcategory) => {
        const catData = props;
        let category = [];

        Object.keys(catData).forEach((key, i) => {
            category[i] = catData[key]
        });

        let categoryId = category[1].id;
        console.log(subcategory);
        console.log(categoryId);
        const ref = firebase.storage().ref(`/IMG/Categorias/subcategorias/${subcategory.description}`);
        firebase.database().ref(`/Category/${categoryId}/subCat/${subcategory.id}`).remove().then(() => {
            console.log(category);
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

    if (catData && catData.data.subCat) {

        Object.keys(catData).forEach((key, i) => {
            catDataToArray[i] = catData[key]
        });
        let subCaData = catDataToArray[1].subCat;

        Object.keys(subCaData).forEach((key, i) => {
            subCat[i] = subCaData[key]
        });

        console.log(subCaData === null ? false : true)

        return (
            <div>
                <div className="row">
                    <div className="col">
                        <DataTable
                            title='Subcategorias'
                            columns={columns}
                            data={subCat}
                            persistTableHead
                        />
                    </div>
                </div>
            </div>
        );
    }
    else {
        return (
            <div className="col text-center">
                <h4 style={{ margin: "3rem" }}>No Hay subCategorias para mostrar.</h4>
            </div>
        )
    }
}

export default Categorias;