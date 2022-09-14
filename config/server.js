module.exports = () => {
  var express = require('express')
  var app = express()
  app.set('view engine', 'ejs')
  app.set('views', './app/views')

  require('../app/routes/web')(app)

  var port = 3000

  app.listen(port, () => {
    console.log('localhost:3000')
  })
}
