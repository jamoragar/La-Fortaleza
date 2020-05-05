import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import firebase from '../../../../config/firebase';
import DataTable from 'react-data-table-component';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

const Slider = () => {
    let { uid } = useParams();
    const columns1 = [
        {
            name: 'Foto',
            cell: row => <img src={row.img} width='500' style={{ margin: "1rem 0 1rem 0" }} alt="..." />,
            grow: 1,
        },
        {
            name: 'Editar',
            button: true,
            cell: (data) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger key={'editar'} placement={'left'}
                                overlay={
                                    <Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Dashboard/${uid}/Slider/EditarSlider/${data.id}`, data: data }}>
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
            cell: row => <img src={row.img} width='500' style={{ margin: "1rem 0 1rem 0" }} alt="..." />,
            grow: 1,
        },
        {
            name: 'Editar',
            button: true,
            cell: (data) => {
                return (
                    <div>
                        <div style={{ display: 'flex' }}>
                            <OverlayTrigger
                                key={'editar'}
                                placement={'left'}
                                overlay={<Tooltip id={`tooltip-bottom`}><strong>Editar</strong></Tooltip>
                                }
                            >
                                <Link to={{ pathname: `/Dashboard/${uid}/Slider/EditarButtons/${data.id}`, data: data }}>
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
    let sliderToArray = [];
    let buttonsToArray = [];

    useEffect(() => {
        firebase.database().ref('/Slider').on('value', snapshot => {
            setSlider(snapshot.child('Main').val());
            setButtons(snapshot.child('Buttons').val());
        })
    }, [])

    if (slider && buttons) {
        Object.keys(slider).forEach((key, i) => {
            sliderToArray[i] = slider[key]
        });
        Object.keys(buttons).forEach((key, i) => {
            buttonsToArray[i] = buttons[key]
        });

        return (
            <div>
                <div className="row" >
                    <div className="col text-center" >
                        <h1 style={{ marginTop: '3rem', marginBottom: '3rem', fontWeight: 'bolder', color: '#606060' }}>Mantenedor Slider</h1>
                    </div>
                </div>
                <DataTable
                    title="Slider"
                    columns={columns1}
                    data={sliderToArray}
                    persistTableHead
                />
                <DataTable
                    title="Buttons"
                    columns={columns2}
                    data={buttonsToArray}
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

export default Slider;