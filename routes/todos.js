const express = require('express')
const router = express.Router()
const {
  getTodo,
  addTodo,
  deleteCompletedTodo,
  deleteOneTodo,
  updateTodoTitle,
  updateTodoStatus,
} = require('../controller/todoController')

router.get('/getTodo', getTodo)

router.post('/addTodo', addTodo)

router.delete('/deleteCompletedTodo', deleteCompletedTodo)

router.delete('/deleteOneTodo/:id', deleteOneTodo)

router.patch('/updateTodoTitle/:id', updateTodoTitle)

router.patch('/updateTodoStatus/:id', updateTodoStatus)

module.exports = router
