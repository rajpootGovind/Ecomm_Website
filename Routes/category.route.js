const categoryController = require("../Controller/category.controller")

module.exports = (app) => {
    app.post("/eWebsite/api/categories", categoryController.createNewCategory)
    app.get("/eWebsite/api/categories", categoryController.getCategories )
    app.put("/eWebsite/api/categories/:id", categoryController.updatedCategories)
    app.delete("/eWebsite/api/categories/:id", categoryController.deleteCategory)
}