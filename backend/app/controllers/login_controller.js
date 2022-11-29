import db from '../../config/db_config.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

const saltRounds = 10

export const adminIndex = async (req, res) => {
  try {
    const admin = await db.select('a.nome', 'a.email').from('admins as a')
    res.send(admin)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Error: ' + error.messsage })
  }
}

export const Login = async (req, res) => {
  const { email, senha } = req.body

  if (!email || !senha) {
    res.status(400).json({ erro: 'Login ou senha incorretos' })
    return
  }

  try {
    const data = await db('admins').where({ email })
    if (data.length == 0) {
      res.status(400).json({ erro: 'Login ou senha incorretos' })
      return
    }

    if (bcrypt.compareSync(senha, data[0].senha)) {
      const token = jwt.sign(
        {
          admin_id: data[0].id,
          admin_nome: data[0].nome
        },
        process.env.JWT_KEY,
        {
          expiresIn: '1h'
        }
      )

      res.status(200).json({ msg: 'Ok! Acesso Liberado', token })
    } else {
      res.status(400).json({ erro: 'Login ou senha incorretos' })
    }
  } catch (error) {
    res.status(400).json({ erro: error.message })
  }
}

export const adminInsert = async (req, res) => {
  const { nome, senha, email } = req.body

  if (!nome || !senha || !email) {
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
    const novo = await db('admins').insert({ nome, senha: hash, email })

    res.status(201).json({ id: novo[0], msg: 'Ok! Inserido com sucesso' })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}
