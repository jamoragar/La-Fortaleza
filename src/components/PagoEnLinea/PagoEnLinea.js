import React, { useEffect, useState } from 'react';
import * as mp from 'mercadopago';
import credentials from './credentials.json';
import moment from 'moment-timezone';

const PagoEnLinea = (pedido, usuario) => {
    let mpData;

    const config = () => {
        mp.configure({
            sandbod: true,
            access_token: credentials.access_token
        });
        mp.configurations.setAccessToken(credentials.access_token);
    };

    const ProductosLaFortaleza = (order) => {
        const productosPreference = order.map((producto) => {
            return (
                {
                    title: producto.nombre,
                    description: producto.tipo,
                    quantity: producto.cantidad,
                    currency_id: 'CLP',
                    unit_price: producto.precio_unitario,
                }
            )
        });

        return productosPreference;
    };

    const creatingPreferences = (pedido, usuario) => {
        moment.tz.add("America/Punta_Arenas|SMT -05 -04 -03|4G.K 50 40 30|0102021212121212121232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323232323|-2q2jh.e fJAh.e 5knG.K 1Vzh.e jRAG.K 1pbh.e 11d0 1oL0 11d0 1oL0 11d0 1oL0 11d0 1pb0 11d0 nHX0 op0 blz0 ko0 Qeo0 WL0 1zd0 On0 1ip0 11z0 1o10 11z0 1qN0 WL0 1ld0 14n0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 WL0 1qN0 1cL0 1cN0 11z0 1o10 11z0 1qN0 WL0 1fB0 19X0 1qN0 11z0 1o10 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1ip0 1fz0 1fB0 11z0 1qN0 WL0 1qN0 WL0 1qN0 WL0 1qN0 11z0 1o10 11z0 1o10 11z0 1qN0 WL0 1qN0 17b0 1ip0 11z0 1o10 19X0 1fB0 1nX0 G10 1EL0 Op0 1zb0 Rd0 1wn0 Rd0 46n0 Ap0|");
        let productos = ProductosLaFortaleza(pedido);
        const preferences = {
            items: productos,
            payer: {
                name: usuario.nombre,
                surname: usuario.apellido,
                email: usuario.email,
                address: {
                    street_name: usuario.direccion,
                    stree_number: parseInt(usuario.numero_direccion)
                },
                date_created: moment().tz('America/Punta_Arenas').format('YYYY-MM-DD HH:mm'),
            },
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: 'ticket'
                    },
                ]
            }
        }
        return preferences;
    };

    let preferences = creatingPreferences(pedido, usuario);
    mpData = async () => {
        config();
        await mp.preferences.create(preferences).then((data) => {
            console.log(data.body.init_point)
            window.location.replace(data.body.init_point);
        }).catch((err) => {
            console.log(err);
        });
    }
    mpData();

}

export default PagoEnLinea;