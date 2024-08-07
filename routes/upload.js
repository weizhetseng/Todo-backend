const express = require('express')
const router = express.Router()
const multer = require('multer')
const firebaseAdmin = require('../connection/firebase')
const bucket = firebaseAdmin.storage().bucket()

const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
})

router.post('/uploadImg', upload.single('file'), function (req, res, next) {
  try {
    const file = req.file
    const blob = bucket.file(file.originalname)
    const blobStream = blob.createWriteStream()

    blobStream.on('finish', () => {
      const config = {
        action: 'read',
        expires: '12-31-2500',
      }

      blob.getSignedUrl(config, (err, imgUrl) => {
        res.status(200).send({
          imgUrl,
        })
      })
    })

    blobStream.on('error', (err) => {
      console.log(err)
      res.status(500).send('上傳失敗')
    })

    blobStream.end(file.buffer)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
