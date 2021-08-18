const productInfo = product => {
    return {
        fyh : new Date().toLocaleString(),
        pid: process.pid,
        product : product.title.toUpperCase(),
        precioEnPesos: product.price * 4000,
        precioEnUSD: product.price,
    }
}

export default {
    productInfo
}