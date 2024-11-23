const productController = require("../Controller/product.controller")

module.exports = (app) => 
{

    app.post('/eWebsite/api/products', productController.newProduct)

    app.get('/eWebsite/api/products', productController.products)

    app.get('/eWebsite/api/products/:id', productController.productById)

    app.put('/eWebsite/api/products/:id', productController.updatedProduct)

    app.delete('/eWebsite/api/products/:id', productController.deletedProduct)
}