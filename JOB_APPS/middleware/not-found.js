const notFoundMiddleware = (req, res) =>
  res.status(404).send('This Route does not exist')

export default notFoundMiddleware
