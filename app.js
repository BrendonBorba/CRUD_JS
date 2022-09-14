var express = require('express')
var app = express()
var port = 8000

app.get('/contato', function (req, res) {
  res.send(`
  <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>Pagina de Contato</h1>
    </body>
    </html>
    `)
})

app.get('/', function (req, res) {
  res.send(`
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>Pagina de Home</h1>
  </body>
  </html>`)
})

app.listen(port, function () {
  console.log('localhost:8000')
})
