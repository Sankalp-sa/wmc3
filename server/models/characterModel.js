import mongoose from 'mongoose';

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  house: {
    type: String,
    required: true
  },
  bloodStatus: {
    type: String,
    required: true
  },
  wand: {
    wood: String,
    core: String,
    length: Number
  },
  patronus: String,
  skills: [String],
  isAlive: {
    type: Boolean,
    default: true
  },
  description: String,
  imageUrl: String
});

const characterModel = mongoose.model('characters', CharacterSchema);

export default characterModel;
