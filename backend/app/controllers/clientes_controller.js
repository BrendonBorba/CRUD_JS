import db from '../../config/db_config.js'

export const clientesIndex = async (req, res) => {
  try {
    const clientes = await db.select('*').from('clientes')
    res.send(clientes)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const clienteInsert = async (req, res) => {
  const { fullname, email, account } = req.body

  if (!fullname || !email || !account) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'fullname', 'email' and 'account'."
    })
    return
  }

  try {
    const cliente = await db('clientes').insert({ fullname, email, account })
    res
      .status(201)
      .json({ id: cliente[0], msg: 'Ok, cliente successfully inserted!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clienteUpdate = async (req, res) => {
  const { id } = req.params

  // atribui via desestruturação
  const { fullname, email, account } = req.body

  if (!fullname || !email || !account) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'fullname', 'email' and 'account'"
    })
    return
  }

  try {
    await db('clientes').where({ id }).update({ fullname, email, account })
    res.status(200).json({ id, msg: 'Ok, cliente successfully changed' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clienteDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('clientes').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, cliente successfully deleted' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clienteSearch = async (req, res) => {
  const { fullname } = req.params

  try {
    const search = await db('clientes').whereLike('fullname', `%${fullname}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const accountSearch = async (req, res) => {
  const { from, to } = req.params

  try {
    const search = await db('clientes')
      .whereBetween('account', [from, to])
      .orderBy('account')
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export default {
  clientesIndex,
  clienteInsert,
  clienteUpdate,
  clienteDestroy,
  clienteSearch,
  accountSearch
}
