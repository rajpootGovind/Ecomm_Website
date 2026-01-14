const categoryModel = require("../Model/category.model");

const productModel = require("../Model/product.model");

// 1. Create new Category-

exports.createNewCategory = async (req, res) => {
  try {
    const category = await categoryModel.create({
      name: req.body.name,
      description: req.body.description,
    });
    return res.status(201).send(category);
  } catch (err) {
    console.log(`error during creating category ${err}`);

    return res.status(500).send({
      message: " error during creating category",
    });
  }
};

//2. Get all categories-

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    return res.status(200).send(categories);
  } catch (err) {
    res.status(404).send({
      message: "Error during getting categories",
    });
  }
};

// 3. Get category by id with its products-

exports.getCategoryById = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);
    if (!category) {
      return res.status(404).send({
        message: "Category not find ",
      });
    }
    const products = await productModel.find({ categoryId: category._id });

    return res.status(200).send({ category, products });
  } catch (err) {
    res.status(404).send({
      message: "Error during getting category with products",
    });
  }
};

//4. Update categories-

exports.updatedCategories = async (req, res) => {
  try {
    const category = await categoryModel.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
    });

    const updatedCategory = {
      name: category.name,
      description: category.description,
    };

    return res.status(201).send(updatedCategory);
  } catch (err) {
    console.log(`error during category updation ${err}`);

    return res.status(500).send({
      message: "error during category update",
    });
  }
};

// 5. Delete category (mark uncategorised remaining products)-

exports.deleteCategory = async (req, res) => {
  try {
    const category = await categoryModel.findById(req.params.id);

    await productModel.updateMany(
      { categoryId: category._id },
      { $unset: { categoryId: " " } }
    );

    await categoryModel.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "category deleted and products ate uncategorised",
    });
  } catch (err) {
    console.log(`error during deleting the category ${err}`);

    res.status(500).send({
      message: "error during delete category",
    });
  }
};
