import express from 'express'
import routes from '../app/routes/routes.js'
import path from 'path'
import { stringify } from 'querystring'

const app = express()
app.use(express.static(path.resolve('public')))
app.use(
  '/fotos',
  express.static(path.resolve('app', 'controllers', 'middlewares', 'fotos'))
)

// app.set('view engine', 'ejs')
// app.set('views', './app/views')

app.use(routes)

const port = 4000
app.listen(port, () => {
  console.log('localhost:4000')
})

export default 'server.js'
