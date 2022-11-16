import express from 'express'
import routes from '../app/routes/routes.js'
import path from 'path'
import { stringify } from 'querystring'

const app = express()
app.use(express.static(path.resolve('public')))

// app.set('view engine', 'ejs')
// app.set('views', './app/views')

app.use(routes)

const port = 3000
app.listen(port, () => {
  console.log('localhost:3000')
})

export default 'server.js'
