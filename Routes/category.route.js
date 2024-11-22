const categoryController = require("../Controller/category.controller")

module.exports = (app) => {
    app.post("/eWebsite/api/categories", categoryController.createNewCategory)
}