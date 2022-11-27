import db from '../../config/db_config.js'
import fs from 'fs'

export const pizzasIndex = async (req, res) => {
  try {
    const pizzas = await db.select('*').from('pizzas')
    res.send(pizzas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const pizzaInsert = async (req, res) => {
  const avatar = req.file.path

  if (
    (req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png') ||
    req.file.size > 2048 * 2048
  ) {
    fs.unlinkSync(avatar)
    res
      .status(400)
      .json({ msg: 'FOrmato invalido de imagem ou imagem muito grande' })
    return
  }

  const { nome, sabor, ingredientes } = req.body

  if (!nome || !sabor || !ingredientes || !avatar) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'category'."
    })
    return
  }

  try {
    const pizza = await db('pizzas').insert({
      nome,
      sabor,
      ingredientes,
      avatar
    })
    res
      .status(201)
      .json({ id: pizza[0], msg: 'Ok, pizza successfully inserted!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const pizzaUpdate = async (req, res) => {
  const { id } = req.params

  // atribui via desestruturação
  const { nome, sabor, ingredientes, avatar } = req.body

  if (!nome || !sabor || !ingredientes) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'category'."
    })
    return
  }

  try {
    await db('pizzas').where({ id }).update({ nome, category })
    res.status(200).json({ id, msg: 'Ok, pizza successfully changed' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const pizzaDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('pizzas').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, pizza successfully deleted' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const pizzaSearch = async (req, res) => {
  const { nome } = req.params

  try {
    const search = await db('pizzas').whereLike('nome', `%${nome}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const categorySearch = async (req, res) => {
  const { category } = req.params

  try {
    const search = await db('pizzas').whereLike('category', `%${category}%`)
    res.status(200).json(search)
    console.log('chegou aqui')
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export default {
  pizzasIndex,
  pizzaInsert,
  pizzaUpdate,
  pizzaDestroy,
  pizzaSearch,
  categorySearch
}
