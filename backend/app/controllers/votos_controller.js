import db from '../../config/db_config.js'
import md5 from 'md5'
import nodemailer from 'nodemailer'

export const votoIndex = async (req, res) => {
  try {
    const avaliacao = await db
      .select('v.*', 'g.nome as garçom')
      .from('votos as v')
      .innerJoin('garcons as g', { 'v.garcom_id': 'g.id' })
    res.status(200).json(avaliacao)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}

async function send_email(hash) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: 'f6890941b53e39',
      pass: 'f57ff7290777b4'
    }
  })
  const urlConfirmacao = 'http://localhost:3000/votos/confirma/' + hash
  let mensa = '<h3>Votos para Garçons</h3>'
  mensa += '<p>Por favor, confirme seu voto clicando no link:</p>'
  mensa += `<a href=${urlConfirmacao}>Confirmar Voto</a>`
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fenadoce 2023" <fenadoce2023@senac.com>', // sender address
    to: 'brendon_fagundes@yahoo.com.br', // list of receivers
    subject: 'Confirmação de Voto em Concurso', // Subject line
    text: `Para confirmar o voto, copie e cole o link:\n${urlConfirmacao}`,
    html: mensa // html body
  })
}

export const votoInsert = async (req, res) => {
  const { cliente_id, garcom_id } = req.body

  if (!cliente_id || !garcom_id) {
    res.status(400).json({
      id: 0,
      msg: 'Erro... informe cliente_id e garçom_id!'
    })
    return
  }

  try {
    const verifica = await db('votos').where({ cliente_id })

    // se a consulta retornou algum registro (significa que já votou)
    if (verifica.length > 0) {
      res.status(400).json({ id: 0, msg: 'Erro... este cliente já votou' })
      return
    }
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
    return
  }

  const hash = md5(cliente_id + garcom_id + Date.now())

  try {
    // insere um registro na tabela de votos, que deverá ser confirmado
    const novo = await db('votos').insert({
      cliente_id,
      garcom_id,
      hash_conf: hash
    })

    send_email(cliente_id, hash).catch(console.error)

    res.status(201).json({
      id: novo[0],
      msg: 'Confirme o voto a partir da sua conta de e-mail'
    })
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}

export const votoConfirmar = async (req, res) => {
  const { hash } = req.params

  // declara a variável que será utilizada dentro e fora do bloco
  let voto
  try {
    // obtém da tabela de votos o voto com o hash informado
    voto = await db('votos').where({ hash_conf: hash })

    // se a consulta retornou algum registro (significa que já votou)
    if (voto.length == 0) {
      res.status(400).send('Código inválido. Por favor, copie e cole novamente')
      return
    }
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
    return
  }

  // define (inicia) uma nova transação
  const trx = await db.transaction()
  console.log(voto[0])

  try {
    // 1ª operação da transação: alterar o status do voto
    // para confirmado
    const novo = await trx('votos')
      .where({ hash_conf: hash })
      .update({ confirmado: 1 })

    // 2ª operação da transação: aumentar o número de votos
    // candidata
    await trx('garcons')
      .where({ id: voto[0].garcom_id })
      .increment({ votos: 1 })

    // commit (grava) a transação
    await trx.commit()

    // mensagem de confirmação
    res.status(201).send('Obrigado! Voto confirmado com sucesso.')
  } catch (error) {
    // rollback (volta) desfaz a operação realizada
    await trx.rollback()

    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}
