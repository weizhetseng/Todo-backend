const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '必填'],
    },
    email: {
      type: String,
      required: [true, '必填'],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, '必填'],
      minlength: 12,
      select: false,
    },
    sex: {
      type: String,
      enum: ['male', 'female'],
    },
    photo: {
      type: String,
    },
    created: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
)

const Users = mongoose.model('User', userSchema)

module.exports = Users
