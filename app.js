var http = require('http')

var server = http.createServer(function (req, res) {
  var pagina = req.url
  console.log(pagina)
  if (pagina == '/contato') {
    res.end(`
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
  } else {
    res.end(
      `
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
    </html>
    `
    )
  }
})

server.listen(8000)