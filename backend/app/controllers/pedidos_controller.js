import db from '../../config/db_config.js'
import ejs from 'ejs'
import path from 'path'
import puppeteer from 'puppeteer'

export const pedidosIndex = async (req, res) => {
  try {
    const pedidos = await db
      .select('p.id', 'c.nome as cliente', 'z.nome as pizza', 'p.quantidade')
      .from('pedidos as p')
      .innerJoin('pizzas as z', { 'p.pizza_id': 'z.id' })
      .innerJoin('clientes as c', { 'p.cliente_id': 'c.id' })
    res.send(pedidos)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

// export const pedidosInsert = async (req, res) => {
//   const { cliente_id, pizza_id, quantidade } = req.body

//   if (!cliente_id || !pizza_id || !quantidade) {
//     res.status(400).json({
//       id: 0,
//       msg: "Error... params not found, please inform 'cliente_id', 'pizza_id' and 'quantidade'."
//     })
//     return
//   }

//   try {
//     const cliente = await db('pedidos').insert({ nome, cpf, email })
//     res
//       .status(201)
//       .json({ id: cliente[0], msg: 'Ok, cliente successfully inserted!' })
//   } catch (error) {
//     res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
//   }
// }

// export const clienteUpdate = async (req, res) => {
//   const { id } = req.params

//   const { nome, cpf, email } = req.body

//   if (!nome || !cpf || !email) {
//     res.status(400).json({
//       id: 0,
//       msg: "Error... params not found, please inform 'nome', 'cpf' and 'email'"
//     })
//     return
//   }

//   try {
//     await db('clientes').where({ id }).update({ nome, cpf, email })
//     res.status(200).json({ id, msg: 'Ok, cliente successfully changed' })
//   } catch (error) {
//     res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
//   }
// }

// export const clienteDestroy = async (req, res) => {
//   const { id } = req.params

//   try {
//     await db('clientes').where({ id }).del()
//     res.status(200).json({ id, msg: 'Ok, cliente successfully deleted' })
//   } catch (error) {
//     res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
//   }
// }

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
