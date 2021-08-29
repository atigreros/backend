function productDTO(product,_id,fyh) {
    return {
        ...product,
        _id,
        fyh
    }
}

export default productDTO