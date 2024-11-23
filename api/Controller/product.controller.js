const productModel = require("../Model/product.model")

const categoryModel = require("../Model/category.model")


// 1. Create product-

exports.newProduct = async(req, res) => {
    try {

    //-> just for cross-check
        // const { name, price, stock, categoryId } = req.body
    
        // // Validate category
        // const category = await categoryModel.findById(categoryId)
        // console.log(category);
        
        // if (!category) {
        //   return res.status(400).send({ error: 'Invalid category ID' })
        // }
    
        // Create
        const product = await productModel.create(
        { 

            name:req.body.name, 
            price: req.body.price, 
            stock:req.body.stock, 
            categoryId:req.body.categoryId 
        })

       return  res.status(201).send(product)
      } 

      catch (err) 
      {
        console.log(`error during product creating ${err}`);
        
        res.status(400).send(
        {
            message: "error during product create"
        });
      }
}


// 2. Get all product-

exports.products = async(req, res) => {
    try{
      const products = await productModel.find()
      return res.status(200).send(products)
  
    }catch(err)
    {
      console.log(`error during product finding ${err}`);
      
     return res.status(500).send(
      {
          message: "error during product finding "
      })
    }
  }


  // 3. Get a product by id with its category-

  exports.productById = async(req, res) => {

    try{
      const product = await productModel.findById(req.params.id)
      if (!product) {
        return res.status(404).send(
            { 
                message: 'Product not found' 
            });
      }

      const category = await categoryModel.find({ _id : product.categoryId})

      return res.status(200).send({product, category})
    }
    
    catch(err){
      console.log(`error during product finding ById ${err}`);
      
     return res.status(404).send(
    {
          message: "error during product finding ById "
      })
    }
  }

  // 4. Update product by id -

  exports.updatedProduct = async(req, res) => {
      try {
        const product = await productModel.findByIdAndUpdate(req.params.id, 
            {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                categoryId: req.body.categoryId
            }
           )
           const newProduct = {
               name: product.name,
               price: product.price,
               stock: product.stock,
               categoryId: product.categoryId
           }
           return res.status(201).send(newProduct)
      }
      
      catch(err)
      {
        console.log(`error during category updation ${err}`)
           res.status(500).send(
        {
            message: "error during product update"
           })
      }
  }

  // 5. Delete product-

  exports.deletedProduct = async(req, res) => {
    try{
      const deletedProduct = await productModel.findByIdAndDelete(req.params.id)
      return res.status(200).send(
        {
            message:"product deleted sucessfully "
        })
       
  }
catch(err)
{
    console.log(`error during deleting product ${err}`);
    return res.status(500).send(
    {
        message:"error during deleting product"
    })
}}