import { Router, json } from 'express'
import {
  clientsIndex,
  clientInsert,
  clientUpdate,
  clientDestroy,
  clientSearch,
  accountSearch
} from '../controllers/clients_controller.js'
import {
  productsIndex,
  productInsert,
  productUpdate,
  productDestroy,
  productSearch,
  categorySearch
} from '../controllers/products_controller.js'

const router = Router()

router.use(json())

router
  .get('/clients', clientsIndex)
  .post('/client', clientInsert)
  .put('/client/:id', clientUpdate)
  .delete('/client/:id', clientDestroy)
  .get('/clients/search/:fullname', clientSearch)
  .get('/clients/search/:from/:to', accountSearch)

  .get('/products', productsIndex)
  .post('/product', productInsert)
  .put('/product/:id', productUpdate)
  .delete('/product/:id', productDestroy)
  .get('/products/search/:name', productSearch)
  .get('/products/search/:category', categorySearch)

export default router
