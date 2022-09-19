import { Router } from 'express'
import clienteModel from '../controllers/clients_controller.js'

const router = Router()

router.get('/contato', (req, res) => {
  res.render('site/contato')
})

router.get('/', async (req, res) => {
  try {
    let x = await clienteModel()
    res.render('site/home', { clients: x })
  } catch {
    console.log('reusultsssss')
  }
})

export default router
