import * as mp from 'mercadopago';
import credentials from './credentials.json';
import timezone from './timezone.json';
import moment from 'moment-timezone';

export const ProductosLaFortaleza = (order) => {
    const productosPreference = order.map((producto) => {
        return (
            {
                id: producto.id,
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

const PagoEnLinea = (pedido, usuario, tokenPedido) => {
    let mpData;
    const urlLocal = 'localhost:3000/Pago/';
    const urlProduccion = 'https://lafortalezapuq.cl/Pago/'

    const config = () => {
        mp.configure({
            sandbod: true,
            access_token: credentials.access_token
        });
        mp.configurations.setAccessToken(credentials.access_token);
    };


    const creatingPreferences = (pedido, usuario) => {
        moment.tz.add(timezone.Punta_Arenas);
        let productos = ProductosLaFortaleza(pedido);
        const preferences = {
            items: productos,
            auto_return: 'all',
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
            back_urls: {
                success: urlProduccion + 'Exito',
                failure: urlProduccion + 'Error'
            },
            payment_methods: {
                excluded_payment_types: [
                    {
                        id: 'ticket'
                    },
                ]
            },
            additional_info: tokenPedido
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