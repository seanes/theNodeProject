import mongoose from 'mongoose';
import validate from 'mongoose-validator';

const Schema = mongoose.Schema;
mongoose.promise = Promise;

const isArray = (value) => {
  return Array.isArray(value)
}

const isEmail = [
  validate({
    validator: 'isEmail',
    message: 'should be a mail'
  }),
  validate({
    validator: 'matches',
    arguments: /^[A-Z0-9._%+-]+@soprasteria.com$/i,
    messge: 'should be a soprasteria mail'
  })
];

const ProfileSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: isEmail
  },
  name: {
    type: String,
    default: "",
  },
  karma: {
    type: Number,
    required: true,
    default: 3,
    min: 0,
    max: 3

  },
  event_history: {
    type: Array,
    default: [],
    validate: {
      validator: isArray,
      message: 'should be an Array'
    }
  },
  profile_img: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: ""
  },
  modified: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: String,
    required: true
  }
});


export default mongoose.model('Profile', ProfileSchema);