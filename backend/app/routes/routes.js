import { Router, json } from 'express'
import cors from 'cors'
import {
  clientesIndex,
  clienteInsert,
  clienteUpdate,
  clienteDestroy,
  clienteSearch,
  emailSearch
} from '../controllers/clientes_controller.js'
import {
  productsIndex,
  productInsert,
  productUpdate,
  productDestroy,
  productSearch,
  categorySearch
} from '../controllers/products_controller.js'
import {
  userIndex,
  userInsert,
  userDestroy
} from '../controllers/users_controller.js'
import { upload } from '../controllers/middlewares/foto_store.js'

const router = Router()

router.use(json())
router.use(cors())

router
  .get('/clientes', clientesIndex)
  .post('/cliente', clienteInsert)
  .put('/cliente/:id', clienteUpdate)
  .delete('/cliente/:id', clienteDestroy)
  .get('/clientes/search/:nome', clienteSearch)
  .get('/clientes/search/:from/:to', emailSearch)

  .get('/products', productsIndex)
  .post('/product', productInsert)
  .put('/product/:id', productUpdate)
  .delete('/product/:id', productDestroy)
  .get('/products/search/:name', productSearch)
  .get('/products/search/:category', categorySearch)

  .get('/usuarios', userIndex)
  .post('/usuario', userInsert)
  .delete('/usuario/:id', userDestroy)

export default router
