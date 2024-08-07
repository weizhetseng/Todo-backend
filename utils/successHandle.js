const successHandle = (res, statusCode, msg, data) => {
  res.status(statusCode).send({
    status: true,
    message: msg,
    data,
  })
}

module.exports = successHandle
