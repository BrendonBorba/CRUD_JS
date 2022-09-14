module.exports = function (app) {
  app.get('/contato', (req, res) => {
    res.render('site/contato')
  })

  app.get('/', (req, res) => {
    res.render('site/home')
  })
}
