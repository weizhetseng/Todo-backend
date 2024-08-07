const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, '請輸入內容'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
)

const Todos = mongoose.model('Todo', todoSchema)

module.exports = Todos
