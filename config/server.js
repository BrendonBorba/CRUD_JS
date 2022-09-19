import express from 'express'
import routes from '../app/routes/routes.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './app/views')

app.use(routes)

const port = 3000
app.listen(port, () => {
  console.log('localhost:3000')
})

export default 'server.js'
