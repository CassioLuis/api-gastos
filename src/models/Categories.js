import mongoose from 'mongoose'

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  subCategory: {
    type: String
  }
})

const Category = mongoose.model("CategoriesSchema", CategoriesSchema)

export default Category