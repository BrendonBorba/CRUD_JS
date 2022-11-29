import db from '../../config/db_config.js'
import md5 from 'md5'
import nodemailer from 'nodemailer'

export const avaliacaoIndex = async (req, res) => {
  try {
    const avaliacao = await db
      .select(
        'p.nome as Pizza',
        'p.avaliacao as Média',
        'g.nome as Garçom Votado',
        'v.data_registro as Data do Voto'
      )
      .from('votos as v')
      .innerJoin('garcons as g', { 'v.garcom_id': 'g.id' })
      .innerJoin('clientes as c', { 'v.cliente_id': 'c.id' })
    res.status(200).json(avaliacao)
  } catch (error) {
    res.status(400).json({ id: 0, msg: 'Erro: ' + error.message })
  }
}
