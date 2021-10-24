import mongoose, { Schema } from 'mongoose'

const URLSchema = new Schema({
  id: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
})

export const URL = mongoose.model('urls', URLSchema)