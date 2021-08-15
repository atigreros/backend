import * as business from '../business/products.js'

/* -------------------------------------- */
/*             HTML ON WIRE               */
/* -------------------------------------- */
export const getHtmlOnwire = async (req,res) => {
    res.render('plantilla-html-onwire', {products: await business.getProducts()})
}

export const postHtmlOnwire = async (req,res) => {
    let product = req.body
    await business.addProduct(product)
    res.redirect('/html-onwire')
}

/* -------------------------------------- */
/*             DATA ON WIRE               */
/* -------------------------------------- */
export const getDataOnwire = (req,res) => {
    res.sendFile(process.cwd() + '/views/plantilla-data-onwire.html')
}

export const postDataOnwire = async (req,res) => {
    let product = req.body
    console.log(product)
    await business.addProduct(product)
    res.json({product})
}

export const dataJSON = async (req,res) => {
    res.json({products: await business.getProducts()})
}


/* -------------------------------------- */
/*                SINGLETON               */
/* -------------------------------------- */
export const getHour = (req,res) => {
    res.json({fyh: business.getHour()})
}
