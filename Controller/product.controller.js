const categoryModel = require("../Model/product.model")

exports.newProduct = async(req, res) => {
  try{
    const product = await categoryModel.create({
        _id: req.body._id,
        name : req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        categoryId: req.body.categoryId
    })
    return res.status(201).send(product)

  }catch(err){
    console.log(`error during product creation ${err}`);
    
   return res.status(500).send({
        message: "error during product create "
    })
  }
}