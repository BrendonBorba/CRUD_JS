import db from '../../config/db_config.js'
import ejs from 'ejs'
import path from 'path'
import puppeteer from 'puppeteer'

export const pedidosIndex = async (req, res) => {
  try {
    const pedidos = await db
      .select(
        'p.id',
        'c.nome as cliente',
        'z.nome as pizza',
        'm.numero as mesa',
        'p.quantidade'
      )
      .from('pedidos as p')
      .innerJoin('pizzas as z', { 'p.pizza_id': 'z.id' })
      .innerJoin('clientes as c', { 'p.cliente_id': 'c.id' })
      .innerJoin('mesas as m', { 'p.mesa_id': 'm.id' })
    res.send(pedidos)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const pedidosInsert = async (req, res) => {
  const { cliente_id, pizza_id, mesa_id, quantidade } = req.body

  if (!cliente_id || !pizza_id || !mesa_id || !quantidade) {
    res.status(400).json({
      id: 0,
      msg: "Erro... informe os valores 'cliente_id', 'pizza_id', 'mesa_id, e 'quantidade'."
    })
    return
  }

  try {
    const mesa = await db('pedidos').insert({
      cliente_id,
      pizza_id,
      mesa_id,
      quantidade
    })
    res
      .status(201)
      .json({ id: mesa[0], msg: 'Ok, pedido realizado com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const pedidoUpdate = async (req, res) => {
  const { id } = req.params

  const { cliente_id, pizza_id, mesa_id, quantidade } = req.body

  if (!cliente_id || !pizza_id || !mesa_id || !quantidade) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'cpf' and 'email'"
    })
    return
  }

  try {
    await db('pedidos')
      .where({ id })
      .update({ cliente_id, pizza_id, mesa_id, quantidade })
    res.status(200).json({ id, msg: 'Ok, pedido atualizado com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const pedidoDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('pedidos').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, pedido deletado com sucessos' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const listaPedidos = async (req, res) => {
  try {
    const pedidos = await db
      .select('p.id', 'c.nome as cliente', 'z.nome as pizza', 'p.quantidade')
      .from('pedidos as p')
      .innerJoin('pizzas as z', { 'p.pizza_id': 'z.id' })
      .innerJoin('clientes as c', { 'p.cliente_id': 'c.id' })

    ejs.renderFile(
      path.resolve('app', 'views', 'lista_pedidos.ejs'),
      { pedidos },
      (err, html) => {
        if (err) {
          return res.status(400).send('Erro na geração da página')
        }
        res.status(200).send(html)
      }
    )
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}

export const pedidosPdf = async (req, res) => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto('http://localhost:3000/pedidos/lista')

  await page.waitForNetworkIdle(0)

  const pdf = await page.pdf({
    printBackground: true,
    format: 'A4',
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  })

  await browser.close()

  res.contentType('application/pdf')

  res.status(200).send(pdf)
}
