const Todos = require('../model/todosModel')
const successHandle = require('../utils/successHandle')
const errorHandle = require('../utils/errorHandle')

const todoController = {
  getTodo: async (req, res, next) => {
    try {
      const data = await Todos.find()
      successHandle(res, 200, '取得成功', data)
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
  addTodo: async (req, res, next) => {
    try {
      const { title } = req.body
      if (title) {
        await Todos.create({ title })
        successHandle(res, 200, '新增成功')
      } else {
        errorHandle(res, 400, '請輸入內容')
      }
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
  deleteCompletedTodo: async (req, res, next) => {
    try {
      await Todos.deleteMany({ completed: true })
      successHandle(res, 200, '刪除成功')
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
  deleteOneTodo: async (req, res, next) => {
    try {
      const { id } = req.params
      await Todos.findByIdAndDelete({ _id: id })
      successHandle(res, 200, '刪除成功')
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
  updateTodoTitle: async (req, res, next) => {
    try {
      const { id } = req.params
      const { title } = req.body
      if (title) {
        await Todos.findByIdAndUpdate({ _id: id }, { title })
        successHandle(res, 200, '修改成功')
      } else {
        errorHandle(res, 400, '請輸入內容')
      }
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
  updateTodoStatus: async (req, res, next) => {
    try {
      const { id } = req.params
      const { completed } = req.body
      await Todos.findByIdAndUpdate({ _id: id }, { completed })
      successHandle(res, 200, '修改成功')
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
}

module.exports = todoController
