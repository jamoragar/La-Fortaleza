import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Slider = () => {
    const columns1 = [
        {
            name: 'Foto',
            cell: slider => <img src={slider} width='500' style={{ margin: "1rem 0 1rem 0" }} alt="..." />,
            grow: 1,
        },
        {
            name: 'Editar',
            button: true,
            cell: (slider) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger key={'editar'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Dashboard/Producto/Slider/${slider}`, data: slider }}>
                                    <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fa fa-fw fa-edit fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];

    const columns2 = [
        {
            name: 'Foto',
            cell: buttons => <img src={buttons} width='500' style={{ margin: "1rem 0 1rem 0" }} alt="..." />,
            grow: 1,
        },
        {
            name: 'Editar',
            button: true,
            cell: (buttons) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger
                                key={'editar'}
                                placement={'left'}
                                overlay={<Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Dashboard/Slider/Editar/${buttons}`, data: buttons }}>
                                    <div style={{ cursor: 'pointer' }} className="text-primary"><i className="fa fa-fw fa-edit fa-lg" style={{ width: '35px', height: '20px' }} /></div>
                                </Link>
                            </OverlayTrigger>
                        </div>
                    </div>
                )
            },

        }
    ];

    const [slider, setSlider] = useState(null);
    const [buttons, setButtons] = useState(null);

    useEffect(() => {
        firebase.database().ref('/Slider').on('value', snapshot => {
            setSlider(snapshot.child('Main').val());
            setButtons(snapshot.child('Buttons').val());
        })
    }, [])

    if (slider && buttons) {
        console.log('Buttons: ', buttons);
        console.log('Slider: ', slider);

        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <h1>Mantenedor Slider</h1>
                    </div>
                </div>
                <div className="row">
                    <DataTable
                        title="Slider"
                        columns={columns1}
                        data={slider}
                        persistTableHead
                    />
                    <DataTable
                        title="Buttons"
                        columns={columns2}
                        data={buttons}
                        persistTableHead
                    />
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

export default Slider;