import mongoose from 'mongoose'

const { Schema } = mongoose;

const SpentSchema = new Schema({
  date: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  spentValue: {
    type: Number,
    required: true
  },
  creditCard: {
    type: Boolean,
    required: true
  },
  presentationDate: {
    type: String,
    required: true
  }
})

const Spent = mongoose.model("SpentSchema", SpentSchema)

export default Spent