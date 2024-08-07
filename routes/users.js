const express = require('express')
const router = express.Router()
const multer = require('multer')
const { signIn, signUp } = require('../controller/userController')

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

router.post('/signIn', signIn)

router.post('/signUp', upload.single('file'), signUp)

// router.post('/update', async (req, res, next) => {
//   try {
//   } catch (error) {
//     errorHandle(res, 500, '錯誤')
//   }
// })

module.exports = router
