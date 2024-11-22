const mongoose = require("mongoose");
const validate = require("validator");

const productSchema = new mongoose.Schema(
    {
        _id: {
            type:String
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: function(num) {
                  return num > 0;
                },
                message: "invalid price are given"
              }
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        categoryId:{
            type: String
        }

    },{versionKey:false, timestamps: true}
)

module.exports = mongoose.model("product", productSchema)