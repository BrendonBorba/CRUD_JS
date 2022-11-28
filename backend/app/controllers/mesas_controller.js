import db from '../../config/db_config.js'
import fs from 'fs'
import puppeteer from 'puppeteer'
import ejs from 'ejs'

export const mesasIndex = async (req, res) => {
  try {
    const mesas = await db.select('*').from('mesas')
    res.send(mesas)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const mesaInsert = async (req, res) => {
  const { numero } = req.body

  if (!numero) {
    res.status(400).json({
      id: 0,
      msg: 'Erro... é preciso informar o número da mesa(ID)! .'
    })
    return
  }

  try {
    const mesa = await db('mesas').insert({ numero })
    res.status(201).json({ id: mesa[0], msg: 'Ok, mesa inserida com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const mesaUpdate = async (req, res) => {
  const { id } = req.params

  const { numero_id } = req.body

  if (!id_id) {
    res.status(400).json({
      id: 0,
      msg: "Error... params not found, please inform 'nome', 'category'."
    })
    return
  }

  try {
    await db('mesas').where({ id }).update({ numero_id })
    res.status(200).json({ id, msg: 'Ok, cadastro de mesa atualizado!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}

export const mesaDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('mesas').where({ id }).del()
    res
      .status(200)
      .json({ id, msg: 'Ok, cadastro de mesa deletado com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.message })
  }
}
