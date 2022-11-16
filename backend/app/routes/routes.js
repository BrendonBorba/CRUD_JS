import { Router, json } from 'express'
import {
  clientesIndex,
  clienteInsert,
  clienteUpdate,
  clienteDestroy,
  clienteSearch,
  accountSearch
} from '../controllers/clientes_controller.js'
import {
  productsIndex,
  productInsert,
  productUpdate,
  productDestroy,
  productSearch,
  categorySearch
} from '../controllers/products_controller.js'

const router = Router()

// router.use(json())

router
  .get('/clientes', clientesIndex)
  .post('/cliente', clienteInsert)
  .put('/cliente/:id', clienteUpdate)
  .delete('/cliente/:id', clienteDestroy)
  .get('/clientes/search/:fullname', clienteSearch)
  .get('/clientes/search/:from/:to', accountSearch)

  .get('/products', productsIndex)
  .post('/product', productInsert)
  .put('/product/:id', productUpdate)
  .delete('/product/:id', productDestroy)
  .get('/products/search/:name', productSearch)
  .get('/products/search/:category', categorySearch)

export default router
