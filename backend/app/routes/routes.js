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
  pizzasIndex,
  pizzaInsert,
  pizzaUpdate,
  pizzaDestroy,
  pizzaSearch,
  categorySearch
} from '../controllers/pizzas_controller.js'
import {
  userIndex,
  userInsert,
  userDestroy
} from '../controllers/usuarios_controller.js'
import {
  listaPedidos,
  pedidosIndex,
  pedidosPdf
} from '../controllers/pedidos_controller.js'
import { Login, adminInsert } from '../controllers/login_controller.js'
import { upload } from '../controllers/middlewares/foto_store.js'
import { VerificaLogin } from '../controllers/middlewares/verifica_login.js'

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

  .get('/pizzas', pizzasIndex)
  .post('/pizza', upload.single('avatar'), pizzaInsert)
  .put('/pizza/:id', pizzaUpdate)
  .delete('/pizza/:id', pizzaDestroy)
  .get('/pizzas/search/:name', pizzaSearch)
  .get('/pizzas/search/:category', categorySearch)

  .get('/usuarios', userIndex)
  .post('/usuario', userInsert)
  .delete('/usuario/:id', userDestroy)

  .get('/login', Login)
  .post('/sign_in', adminInsert)

  .get('/pedidos', pedidosIndex)
  .get('/pedidos/lista', listaPedidos)
  .get('/pedidos/pdf', pedidosPdf)

export default router
