const errorHandle = (res, statusCode, msg) => {
  res.status(statusCode).send({
    status: false,
    message: msg,
  })
}

module.exports = errorHandle
