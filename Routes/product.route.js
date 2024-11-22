const productController = require("../Controller/product.controller")

module.exports = (app) => {
    app.post('/eWebsite/api/products', productController.newProduct)
}