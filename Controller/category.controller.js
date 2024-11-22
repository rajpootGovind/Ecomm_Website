const categoryModel = require("../Model/category.model")


exports.createNewCategory = async (req, res) => {
      try{
        const category = await categoryModel.create({
            _id : req.body._id,
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