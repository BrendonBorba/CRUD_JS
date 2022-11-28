import db from '../../config/db_config.js'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const userIndex = async (req, res) => {
  try {
    const users = await db.select('*').from('usuarios')
    res.send(users)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error, ' + error.message })
  }
}

export const userInsert = async (req, res) => {
  const { nome, senha, email, funcao } = req.body

  if (!nome || !senha || !email || !funcao) {
    res
      .status(400)
      .json({ id: 0, msg: 'Erro, informe nome, senha e email, please!' })
    return
  }

  if (senha.length < 10) {
    res
      .status(400)
      .json({ id: 0, msg: 'Erro, senha necessita no minimo 10 digitos.' })
  }
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  for (const letra of senha) {
    if (/[a-z]/.test(letra)) {
      pequenas++
    } else if (/[A-Z]/.test(letra)) {
      grandes++
    } else if (/[0-9]/.test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    res.status(400).json({
      id: 0,
      msg: 'Erro... senha deve conter letras minúsculas, maiúsculas, números e símbolos'
    })
    return
  }
  const salt = bcrypt.genSaltSync(saltRounds)

  const hash = bcrypt.hashSync(senha, salt)

  try {
    const novo = await db('usuarios').insert({
      nome,
      senha: hash,
      email,
      funcao
    })

    res.status(201).json({ id: novo[0], msg: 'Ok! Inserido com sucesso' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}

export const userDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('usuarios').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, usuario removido com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro' + error.message })
  }
}
