import React from 'react';

export default function TableInfo() {
    return (
        <div >
            <div className="row my-3">
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="border-right">
                                <th scope="row"><span style={{ fontSize: "4em", color: "#606060" }}><i className="fas fa-dolly"></i></span></th>
                                <td className="mt-4">
                                    <p className="h5-responsive"><strong>Entrega gratuita</strong></p>
                                    <p className="h6-responsive text-muted">Por compras superiores a $30.000 pesos. (Dentro de la zona urbana de Punta Arenas)</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="border-right">
                                <th scope="row"><span style={{ fontSize: "4em", color: "#606060" }}><i className="fas fa-credit-card"></i></span></th>
                                <td>
                                    <p className="h5-responsive"><strong>Metodos de pago seguro</strong></p>
                                    <p className="h6-responsive text-muted">Crédito, débito, transferencia y efectivo.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="border-right ">
                                <th scope="row"><span style={{ fontSize: "4em", color: "#606060" }}><i className="fas fa-gift"></i></span></th>
                                <td className="mt-4">
                                    <p className="h5-responsive"><strong>Servicios Especiales</strong></p>
                                    <p className="h6-responsive text-muted">Envolvemos tu compra para regalo. (cargo adicional)</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <table className="table table-borderless">
                        <tbody>
                            <tr className="border-right">
                                <th scope="row"><span style={{ fontSize: "4em", color: "#606060" }}><i className="fas fa-tags"></i></span></th>
                                <td className="mt-4">
                                    <p className="h5-responsive"><strong>Ofertas</strong></p>
                                    <p className="h6-responsive text-muted">Los mejores descuentos en artículos seleccionados.</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div >
            </div >
        </div >
    )
}