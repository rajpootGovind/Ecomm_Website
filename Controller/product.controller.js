const productModel = require("../Model/product.model")
const categoryModel = require("../Model/category.model")


exports.newProduct = async(req, res) => {
  try{
    const { name, price, stock, categoryId } = req.body;
    const category = await categoryModel.findById(categoryId);
    if (!category) return res.status(400).json({ error: 'Invalid category ID' });
    const product = await productModel.create({
        name, price, stock, categoryId
        // name : req.body.name,
        // price: req.body.price,
        // stock: req.body.stock,
        // categoryId: category
        //const category = await Category.findById(categoryId);
    })
    return res.status(201).send(product)

  }catch(err){
    console.log(`error during product creation ${err}`);
    
   return res.status(500).send({
        message: "error during product create "
    })
  }
}


// Get all product

exports.products = async(req, res) => {
    try{
      const products = await productModel.find()
      return res.status(200).send(products)
  
    }catch(err){
      console.log(`error during product finding ${err}`);
      
     return res.status(500).send({
          message: "error during product finding "
      })
    }
  }


  //get all product by id with its categories

  exports.productsById = async(req, res) => {
    try{
      const products = await productModel.findById(req.params._id).populate('categoryId', 'name')
      return res.status(200).send(products)
  
    }catch(err){
      console.log(`error during product findingById ${err}`);
      
     return res.status(500).send({
          message: "error during product findingById "
      })
    }
  }