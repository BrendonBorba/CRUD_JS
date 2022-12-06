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
  const { nome, cpf, email } = req.body

  if (!nome || !cpf || !email) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'cpf' and 'email'."
    })
    return
  }

  try {
    const cliente = await db('clientes').insert({ nome, cpf, email })
    res
      .status(201)
      .json({ id: cliente[0], msg: 'Ok, cliente successfully inserted!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clienteUpdate = async (req, res) => {
  const { id } = req.params

  const { nome, cpf, email } = req.body

  if (!nome || !cpf || !email) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'cpf' and 'email'"
    })
    return
  }

  try {
    await db('clientes').where({ id }).update({ nome, cpf, email })
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
  const { nome } = req.params

  try {
    const search = await db('clientes').whereLike('nome', `%${nome}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const emailSearch = async (req, res) => {
  const { from, to } = req.params

  try {
    const search = await db('clientes')
      .whereBetween('email', [from, to])
      .orderBy('email')
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const totalClientes = async (req, res) => {
  try {
    const consulta = await db('clientes').count({ num: '*' })

    const { num } = consulta[0]

    res.status(200).json({ num })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}
