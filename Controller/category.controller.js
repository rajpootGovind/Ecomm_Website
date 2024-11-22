const categoryModel = require("../Model/category.model");
const productModel = require("../Model/product.model");


exports.createNewCategory = async (req, res) => {
      try{
        const category = await categoryModel.create({
           
            name: req.body.name,
            description: req.body.description
        })
       return res.status(201).send(category)
      }
      catch(err){
        console.log(`error during creating category ${err}`);
        
       return res.status(500).send({
            message:" error during creating category"
        })
      }

}

// Get all categories

exports.getCategories =async (req, res) => {
    try{
        const categories = await categoryModel.find()
        return res.status(200).send(categories)
      }catch(err){
        res.status(500).send({
            message : "Error during getting categories"
        })
      }
}

//get categories by id with its products

exports.getCategoriesById =async (req, res) => {
    try{
        const categories = await categoryModel.findById(req.params.id)
        return res.status(200).send(categories)
      }catch(err){
        res.status(500).send({
            message : "Error during getting categories"
        })
      }
}


//Update categories

exports.updatedCategories = async (req, res) => {
 try{
    const category =  await categoryModel.findByIdAndUpdate(req.params.id, 
        { 
            name: req.body.name, 
            description: req.body.description 
        })

    const updatedCategory = {
      name: category.name,
      description: category.description
    }
    return res.status(201).send(updatedCategory)

 }catch(err){
    console.log(`error during category updation ${err}`)
    
    return res.status(500).send({
        message: "error during category update"
    })
 }
}

// delete category (mark uncategorised remaining products)

exports.deleteCategory = async(req, res) => {
 try{
    const category = await categoryModel.findById(req.params.id)

    await productModel.updateMany({categoryId : category._Id}, {$unset: {categoryId: " "}})

    await categoryModel.findByIdAndDelete(req.params.id)

    return res.status(200).send({
        message: "category deleted and products ate uncategorised"
    })
 }catch(err){
    console.log(`error during deleting the category ${err}`);
    
    res.status(500).send({
        message: "error during delete category"
    })
 }
}