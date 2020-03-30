export function formatPrice(price) {
    const finalPrice = parseInt(price)
    return finalPrice.toLocaleString('es-CL', {
        style: 'currency',
        currency: 'CLP'
    })
}
