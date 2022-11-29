import db from '../../config/db_config.js'
import fs from 'fs'
import puppeteer from 'puppeteer'
import ejs from 'ejs'

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
    req.file.size > 1920 * 1080
  ) {
    fs.unlinkSync(avatar)
    res
      .status(400)
      .json({ msg: 'FOrmato invalido de imagem ou imagem muito grande' })
    return
  }

  const { nome, sabor, ingredientes, tipo } = req.body

  if (!nome || !sabor || !ingredientes || !tipo || !avatar) {
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
      tipo,
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

  const { ingredientes, tipo } = req.body

  if (!ingredientes || !tipo) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'category'."
    })
    return
  }

  try {
    await db('pizzas').where({ id }).update({ ingredientes, tipo })
    res.status(200).json({ id, msg: 'Ok, cadastro de pizza atualizado!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const pizzaDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('pizzas').where({ id }).del()
    res
      .status(200)
      .json({ id, msg: 'Ok, cadastro de pizza deletado com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const nomePizza = async (req, res) => {
  const { nome } = req.params

  try {
    const search = await db
      .select(
        'p.nome as Pizza',
        'p.sabor as Sabor',
        'p.ingredientes as Ingredientes',
        'p.tipo as Tipo'
      )
      .from('pizzas as p')
      .whereLike('nome', `%${nome}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const saborPizza = async (req, res) => {
  const { sabor } = req.params

  try {
    const search = await db
      .select(
        'p.nome as Pizza',
        'p.sabor as Sabor',
        'p.ingredientes as Ingredientes',
        'p.tipo as Tipo'
      )
      .from('pizzas as p')
      .whereLike('sabor', `%${sabor}%`)
    res.status(200).json(search)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const tipoPizza = async (req, res) => {
  try {
    // consulta com agrupamento
    const consulta = await db('pizzas')
      .select('tipo')
      .count({ quantidade: '*' })
      .groupBy('tipo')
    res.status(200).json(consulta)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}

export const quantiSabor = async (req, res) => {
  try {
    // consulta com agrupamento
    const consulta = await db('pizzas')
      .select('sabor')
      .count({ quantidade: '*' })
      .groupBy('sabor')
    res.status(200).json(consulta)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}
