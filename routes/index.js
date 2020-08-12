
module.exports = (app) => {
  app.use('/api/post', require('./PostRouter'));
  app.use('/api/user', require('./UserRouter'));
}
