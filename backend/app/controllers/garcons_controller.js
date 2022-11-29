import db from '../../config/db_config.js'
import bcrypt from 'bcrypt'

const saltRounds = 10

export const garcomIndex = async (req, res) => {
  try {
    const garcons = await db.select('*').from('garcons')
    res.send(garcons)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error, ' + error.message })
  }
}

export const garcomInsert = async (req, res) => {
  const avatar = req.file.path

  if (
    (req.file.mimetype != 'image/jpeg' && req.file.mimetype != 'image/png') ||
    req.file.size > 3840 * 2160
  ) {
    fs.unlinkSync(avatar)
    res
      .status(400)
      .json({ msg: 'Formato invalido de imagem ou imagem muito grande' })
    return
  }

  const { nome, email, senha } = req.body

  if (!nome || !senha || !email || !avatar) {
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
    const novo = await db('garcons').insert({
      nome,
      email,
      senha: hash,
      avatar
    })

    res.status(201).json({ id: novo[0], msg: 'Ok! Inserido com sucesso' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}

export const garcomDestroy = async (req, res) => {
  const { id } = req.params

  try {
    await db('garcons').where({ id }).del()
    res.status(200).json({ id, msg: 'Ok, usuario removido com sucesso!' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro' + error.message })
  }
}

export const garcomMaisVotada = async (req, res) => {
  try {
    // consulta com ordenação e limite de registros retornados
    const consulta = await db('garcons')
      .select('nome', 'votos')
      .orderBy('votos', 'desc')
      .limit(5)
    res.status(200).json(consulta)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}
