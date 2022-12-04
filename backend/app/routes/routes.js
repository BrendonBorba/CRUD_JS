import { Router, json } from 'express'
import cors from 'cors'
import {
  clientesIndex,
  clienteInsert,
  clienteUpdate,
  clienteDestroy,
  clienteSearch
} from '../controllers/clientes_controller.js'
import {
  pizzasIndex,
  pizzaInsert,
  pizzaUpdate,
  pizzaDestroy,
  nomePizza,
  saborPizza,
  tipoPizza,
  quantiSabor
} from '../controllers/pizzas_controller.js'
import {
  garcomIndex,
  garcomInsert,
  garcomDestroy,
  garcomMaisVotada
} from '../controllers/garcons_controller.js'
import {
  listaPedidos,
  pedidoDestroy,
  pedidosIndex,
  pedidosInsert,
  pedidosPdf,
  pedidoUpdate
} from '../controllers/pedidos_controller.js'
import {
  mesaDestroy,
  mesaInsert,
  mesasIndex,
  mesaUpdate
} from '../controllers/mesas_controller.js'
import {
  votoIndex,
  votoInsert,
  votoConfirmar
} from '../controllers/votos_controller.js'
import { avaliacaoIndex } from '../controllers/avaliacao_pizza_controller.js'
import {
  Login,
  adminInsert,
  adminIndex
} from '../controllers/login_controller.js'
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

  .get('/pizzas', pizzasIndex)
  .post('/pizza', upload.single('avatar'), pizzaInsert)
  .put('/pizza/:id', pizzaUpdate)
  .delete('/pizza/:id', VerificaLogin, pizzaDestroy)
  .get('/pizzas/pesquisa/nome/:nome', nomePizza)
  .get('/pizzas/pesquisa/sabor/:sabor', saborPizza)
  .get('/pizzas/pesquisa/tipo', tipoPizza)
  .get('/pizzas/pesquisa/sabores', quantiSabor)

  .get('/garcons', garcomIndex)
  .post('/garcom', upload.single('avatar'), garcomInsert)
  .delete('/garcom/:id', garcomDestroy)
  .get('/garcom/votacao', garcomMaisVotada)

  .get('/login', Login)
  .get('/admins', adminIndex)
  .post('/sign_in', adminInsert)

  .get('/pedidos', pedidosIndex)
  .post('/pedido', pedidosInsert)
  .put('/pedido/:id', pedidoUpdate)
  .delete('/pedido/:id', pedidoDestroy)
  .get('/pedidos/lista', listaPedidos)
  .get('/pedidos/pdf', pedidosPdf)

  .get('/mesas', mesasIndex)
  .post('/mesa', mesaInsert)
  .put('/mesa/:id', mesaUpdate)
  .delete('/mesa/:id', mesaDestroy)

  .get('/votos_garcons', votoIndex)
  .post('/votar_garcom', votoInsert)
  .get('/votos/confirma/:hash', votoConfirmar)

  .get('/avaliacao_pizzas', avaliacaoIndex)

export default router
