export function formatPrice(price) {
    return price.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}

export const productoItems = [
    {
        name: 'Takenoko',
        img: '/img/grid1.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 9990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 2',
        img: '/img/grid2.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'BoardingGames',
        categoria: 'Generico',
        price: 5990
    },
    {
        name: 'producto 3',
        img: '/img/grid3.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'TradingCard',
        categoria: 'MTG',
        price: 5990
    },
    {
        name: 'producto 3',
        img: '/img/grid3.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'TradingCard',
        categoria: 'MTG',
        price: 5990
    },
    {
        name: 'producto 3',
        img: '/img/grid3.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'TradingCard',
        categoria: 'MTG',
        price: 5990
    },
    {
        name: 'producto 3',
        img: '/img/grid3.jpg',
        detail: 'juegos demesa blabla bla blabla',
        stock: 10,
        section: 'TradingCard',
        categoria: 'MTG',
        price: 5990
    },
]

export const productos = productoItems.reduce((res, producto) => {
    if (!res[producto.categoria]) {
        res[producto.categoria] = []
    }
    res[producto.categoria].push(producto)
    return res;
}, {});