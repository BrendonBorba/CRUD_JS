import db from '../../config/db_config.js'

export const clientsIndex = async (req, res) => {
  try {
    const clients = await db.select('*').from('clients')
    res.render('clients/index', {
      clients: clients
    })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const clientInsert = async (req, res) => {
  const { fullname, email, account } = req.body

  if (!fullname || !email || !account) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'fullname', 'email' and 'account'."
    })
    return
  }

  try {
    const client = await db('clients').insert({ fullname, email, account })
    res
      .status(201)
      .json({ id: client[0], msg: 'Ok, client successfully inserted!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clientUpdate = async (req, res) => {
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
    await db('clients').where({ id }).update({ fullname, email, account })
    res.status(200).json({ id, msg: 'Ok, client successfully changed' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clientDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('clients').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, client successfully deleted' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const clientSearch = async (req, res) => {
  const { fullname } = req.params

  try {
    const search = await db('clients').whereLike('fullname', `%${fullname}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const accountSearch = async (req, res) => {
  const { from, to } = req.params

  try {
    const search = await db('clients')
      .whereBetween('account', [from, to])
      .orderBy('account')
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export default {
  clientsIndex,
  clientInsert,
  clientUpdate,
  clientDestroy,
  clientSearch,
  accountSearch
}
