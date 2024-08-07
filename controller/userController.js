const errorHandle = require('../utils/errorHandle')
const successHandle = require('../utils/successHandle')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')
const User = require('../model/usersModel')

require('dotenv').config('./.env')

const userController = {
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        return errorHandle(res, 400, '請輸入完整資料')
      }

      if (!validator.isEmail(email)) {
        return errorHandle(res, 400, '帳號或密碼錯誤')
      }

      if (
        !validator.isLength(password, { min: 12 }) ||
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/.test(password)
      ) {
        return errorHandle(res, 400, '帳號或密碼錯誤')
      }

      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return errorHandle(res, 400, '帳號或密碼錯誤')
      }

      const auth = await bcrypt.compare(password, user.password)

      if (!auth) {
        return errorHandle(res, 400, '帳號或密碼錯誤')
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY,
      })

      res.status(200).send({
        status: true,
        message: '登入成功',
        token,
      })
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
  signUp: async (req, res, next) => {
    try {
      let { name, email, password, confirmPassword } = req.body

      const isUser = await User.findOne({ email })

      if (isUser) {
        return errorHandle(res, 400, '帳號已存在')
      }

      if (!name || !email || !password || !confirmPassword) {
        return errorHandle(res, 400, '請輸入完整資料')
      }

      if (!validator.isEmail(email)) {
        return errorHandle(res, 400, '請輸入正確 email 格式')
      }

      if (
        !validator.isLength(password, { min: 12 }) ||
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{12,}$/.test(password)
      ) {
        return errorHandle(res, 400, '密碼長度至少12個字元及包含大小寫英文、數字')
      }

      if (password !== confirmPassword) {
        return errorHandle(res, 400, '密碼與確認密碼不符')
      }

      password = await bcrypt.hash(password, 12)

      await User.create({
        name,
        email,
        password,
      })

      successHandle(res, 200, '註冊成功')
    } catch (error) {
      errorHandle(res, 500, '錯誤')
    }
  },
}

module.exports = userController
