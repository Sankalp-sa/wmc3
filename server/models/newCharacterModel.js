import mongoose from 'mongoose';

const newCharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
  },
  house: {
    type: String,
  },
  bloodStatus: {
    type: String,
  },
  wand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'wands'
  },
  patronus: String,
  skills: [String],
  isAlive: {
    type: Boolean,
    default: true
  },
  description: String,
  imageUrl: String,
  imageFront:{
    data: Buffer,
    contentType: String
  },
  imageBack:{
    data: Buffer,
    contentType: String
  },
});

const newCharacterModel = mongoose.model('newCharacters', newCharacterSchema);

export default newCharacterModel;
